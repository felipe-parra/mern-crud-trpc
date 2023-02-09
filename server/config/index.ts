import dotenv from 'dotenv'

dotenv.config()

export const config = {
  port: process.env.PORT || 3031,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/express-ts'
}
