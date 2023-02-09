import React from 'react'
import { trpc } from '../utils/trpc'

interface Props {
  expense: {
    _id: string
    name: string
    amount: number
    validated: boolean
  }
}

export default function ExpenseCard({ expense }: Props) {
  const deleteExpense = trpc.expenses.delete.useMutation()
  const toggleValidate = trpc.expenses.toggleValidate.useMutation()
  const utils = trpc.useContext()
  const handleDelete = () => {
    deleteExpense.mutate(expense._id, {
      onSuccess: (data) => {
        if (data) {
          utils.expenses.get.invalidate()
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  const handleToggle = () => {
    toggleValidate.mutate(expense._id, {
      onSuccess: (data) => {
        if (data) {
          utils.expenses.get.invalidate()
        }
      },
      onError: (error) => {
        console.log(error)
      }
    })
  }
  return (
    <div className='flex items-center justify-between w-full border-b my-2 p-2'>
      <button
        className='transition-all duration-200 ring-0 focus:ring-offset-0 ring-offset-0'
        onClick={handleToggle}
      >
        {expense.validated ? '✅' : '❌'}
      </button>
      <h3>{expense.name}</h3>
      <p>{expense.amount}</p>
      <section>
        <button
          className='bg-red-400 rounded-full px-2 py-1 text-xs text-center'
          onClick={handleDelete}
        >
          Delete
        </button>
      </section>
    </div>
  )
}
