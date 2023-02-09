import { ChangeEvent, FormEvent, useState } from 'react'
import { trpc } from '../utils/trpc'

type Expense = {
  name: string
  amount: number
}
const INITIAL_EXPENSE = {
  name: '',
  amount: 0
}
export default function ExpenseForm() {
  const [expense, setExpense] = useState<Expense>(INITIAL_EXPENSE)

  const addExpense = trpc.expenses.create.useMutation()
  const utils = trpc.useContext()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setExpense({
      ...expense,
      [name]: name === 'amount' ? Number(value) : value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(expense)
    addExpense.mutate(expense, {
      onSuccess: (data) => {
        if (data) {
          console.log('success')
          setExpense(INITIAL_EXPENSE)
          utils.expenses.get.invalidate()
        }
      }
    })
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col border rounded-xl p-4 w-1/2'
    >
      <article>
        <h2 className='font-semibold text-2xl text-center'>Add Expense</h2>
      </article>
      <article className='flex flex-col'>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          autoFocus
          onChange={handleChange}
          value={expense.name}
          className='p-2 rounded-lg'
        />
      </article>
      <article className='flex flex-col'>
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          name='amount'
          id='amount'
          onChange={handleChange}
          value={expense.amount}
          className='p-2 rounded-lg'
          onFocus={(e) => {
            e.target.select()
          }}
        />
      </article>
      <button
        className='w-full bg-blue-400 my-3 rounded-full p-2'
        type='submit'
      >
        Save
      </button>
    </form>
  )
}
