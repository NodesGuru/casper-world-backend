import mongoose from 'mongoose'

export default async function() {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/casper`, {
      authSource: process.env.DB_AUTH_SOURCE,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
  } catch (e) {
    throw new Error((e as Error).message)
  }
}