import { trpc } from '../utils/trpc'
import ExpenseCard from './ExpenseCard'

export const ExpensesList = () => {
  const { isLoading, data, error } = trpc.expenses.get.useQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className='w-1/2 my-4'>
      <article>
        <ul className='flex items-center justify-between'>
          <li>Validated</li>
          <li>Name</li>
          <li>Amount</li>
          <li>Actions</li>
        </ul>
      </article>
      <article className='w-full'>
        {data?.map((expense: any, index) => (
          <ExpenseCard key={index + '-key'} expense={expense} />
        ))}
      </article>
    </div>
  )
}
