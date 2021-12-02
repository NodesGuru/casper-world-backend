import mongoose from 'mongoose'
import { IValidator } from '../../types'

const ValidatorSchema = new mongoose.Schema<IValidator>({
  public_key: { type: String, required: true },
  timestamp: Number,
  inactive: Boolean,
  delegators: Array,
  total_stake: String,
  self_stake: String,
  current_stake: String,
  delegators_stake: String,
  version: String,
  ip: String,
  vps: String,
  country: String,
  latitude: Number,
  longitude: Number
}, { versionKey: false })

export const Validator = mongoose.model<IValidator>('Validator', ValidatorSchema)