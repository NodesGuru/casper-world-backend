import mongoose from 'mongoose'
import { ILogger } from '../../types'

const LoggerSchema = new mongoose.Schema<ILogger>({
  name: String,
  failCount: Number,
  failedAt: String,
  nextRunAt: String,
  failReason: String
}, { versionKey: false })

export const Logger = mongoose.model<ILogger>('Logger', LoggerSchema)