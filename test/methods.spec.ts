import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import * as mockData from './mock/data'
import { getPeersFromDB, insertLogToDB, insertValidatorsToDB } from '../db/methods'
import { Validator } from '../db/models/validator'
import { Logger } from '../db/models/logger'

describe('Database methods', () => {
  let mongod: MongoMemoryServer

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
    const uri = mongod.getUri()
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10
    }

    await mongoose.connect(uri, mongooseOpts)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
  })

  test('insert validators', async () => {
    const validators = [mockData.validator]
    await insertValidatorsToDB(validators)
    const newValidator = await Validator.findOne({ ip: mockData.validator.ip }, { _id: 0 })
    expect(JSON.stringify(newValidator)).toEqual(JSON.stringify((mockData.validator)))
  })

  test('insert logger', async () => {
    await insertLogToDB(mockData.logger)
    const newLogger = await Logger.findOne({}, { _id: 0 })
    expect(JSON.stringify(newLogger)).toEqual(JSON.stringify((mockData.logger)))
  })

  test('should return correct array', async () => {
    const validators = [mockData.validator]
    await insertValidatorsToDB(validators)
    const peers = await getPeersFromDB()
    const output = ['139.59.226.13']
    expect(peers).toEqual(output)
  })
})