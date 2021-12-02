require('dotenv').config()
import mongoose from 'mongoose'
import { Agenda } from 'agenda'
import dbConnect from './db/connect'
import updateValidators from './jobs/main'
import { addMinutesToCurrentDate } from './utils/helpers'
import { insertLogToDB } from './db/methods'

const FAILED_RETRY_ADDITIONAL_MINUTES = 5
const MAX_ATTEMPTS = 3
let attemptsCount = 1
const agenda = new Agenda()

async function init() {
  // initialize mongo, connect agenda to mongo
  await dbConnect()
  await agenda.mongo(mongoose.connection.db, 'casper-jobs')
}

agenda.define('casper validators', async (job, done) => {
  console.log('Job started', new Date())
  await updateValidators()
  await job.save()
  done()
})

agenda.on('success', async (job) => {
  attemptsCount = 0
  console.log(job.attrs.name + ' finished successfully', new Date())
})

agenda.on('fail', async (err, job) => {
  const jobName = job.attrs.name
  const failReason = err.message
  const failedAt = new Date().toISOString()

  console.log(jobName + ' failed with error ' + failReason)

  // If 3 attempts to run the job returned fail, the job will be retried in 1 hour
  if (attemptsCount <= MAX_ATTEMPTS) {
    const nextRunAt = addMinutesToCurrentDate(FAILED_RETRY_ADDITIONAL_MINUTES)
    const log = {
      name: jobName,
      failCount: attemptsCount,
      failedAt,
      nextRunAt,
      failReason
    }
    await insertLogToDB(log)
    attemptsCount++
    job.attrs.nextRunAt = nextRunAt
    job.save()
  } else {
    const log = {
      name: jobName,
      failCount: attemptsCount,
      failedAt,
      nextRunAt: null,
      failReason: `Critical error: ${failReason}`
    }
    await insertLogToDB(log)
    attemptsCount = 0
  }
});

(async function() {
  // self invoking function, performed every hour
  await init()
  await agenda.start()
  await agenda.every('1 hour', 'casper validators')
})()