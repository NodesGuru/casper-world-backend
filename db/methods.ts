import { Validator } from './models/validator'
import { Logger } from './models/logger'
import { ILogger, IValidator } from '../types'

/**
 * Insert validators to database
 *
 * @param {IValidator[]} validators Parsed validators
 */
export async function insertValidatorsToDB(validators: IValidator[]) {
  await Validator.insertMany(validators, { ordered: false }).catch(e => new Error(e))
}

/**
 * Insert log to database
 *
 * @param {ILogger} log Error log
 */
export async function insertLogToDB(log: ILogger) {
  const logger = new Logger(log)
  await logger.save()
}

// get unique IPs from database
export async function getPeersFromDB(): Promise<string[]> {
  const peers = await Validator.aggregate([
    { $match: { ip: { $ne: null } } },
    {
      $group: {
        _id: '$ip'
      }
    },
    {
      $project: {
        _id: 0,
        ip: '$_id'
      }
    }
  ])

  return peers?.map(r => r.ip) || []
}