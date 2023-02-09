import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import Expenses from '../models/expenses'

const getExpenses = publicProcedure.query(async () => {
  const expenses = await Expenses.find()
  return expenses
})

const createNewExpense = publicProcedure
  .input(
    z.object({
      name: z.string(),
      amount: z.number()
    })
  )
  .mutation(async ({ input }) => {
    console.log('createNewExpense', input)
    const newExpense = new Expenses(input)

    const savedExpense = await newExpense.save()

    return savedExpense
  })

const updateExpense = publicProcedure
  .input(
    z.object({
      _id: z.string(),
      name: z.string(),
      amount: z.number()
    })
  )
  .mutation(async ({ input }) => {
    const foundExpense = await Expenses.findById(input._id)
    if (!foundExpense) {
      throw new Error('Expense not found')
    }

    const updatedExpense = await Expenses.findByIdAndUpdate(input._id, input, {
      new: true
    })

    return updatedExpense
  })
const toggleExpense = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const foundExpense = await Expenses.findById(input)
    if (!foundExpense) {
      throw new Error('Expense not found')
    }

    const updatedExpense = await Expenses.findByIdAndUpdate(
      input,
      { validated: !foundExpense.validated },
      { new: true }
    )

    return updatedExpense
  })

const deleteExpense = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const foundExpense = await Expenses.findById(input)
    if (!foundExpense) {
      throw new Error('Expense not found')
    }
    const deletedExpense = await Expenses.findByIdAndDelete(input)
    return deletedExpense
  })

export const expensesRouter = router({
  get: getExpenses,
  create: createNewExpense,
  update: updateExpense,
  toggleValidate: toggleExpense,
  delete: deleteExpense
})
