import { router } from '../trpc'
import { expensesRouter } from './expenses'

export const appRouter = router({
  expenses: expensesRouter
})
