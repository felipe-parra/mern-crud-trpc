import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { createContext } from './trpc'
import { appRouter } from './routes'

const app = express()

app.use(morgan('dev'))

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext
  })
)

export type AppRouter = typeof appRouter

export default app
