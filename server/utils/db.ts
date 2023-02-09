import mongoose from 'mongoose'
import { config } from '../config'

export const dbConnect = async () => {
  try {
    mongoose.set('strictQuery', false)
    const db = await mongoose.connect('mongodb://localhost:27018/expenses-app')
    console.log(
      'Database connected successfully to',
      db.connection.db.databaseName,
      'database'
    )
  } catch (error) {
    console.log('Database connection error', error)
  }
}
