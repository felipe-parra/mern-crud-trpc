import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import { trpc } from './utils/trpc'
import { ExpensesList } from './components/ExpensesList'
import ExpenseForm from './components/ExpenseForm'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3031/trpc',
          // optional
          headers() {
            return {
              authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }
        })
      ]
    })
  )

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        <section className='p-4 w-screen h-screen flex flex-col items-center justify-start'>
          <ExpenseForm />
          <ExpensesList />
        </section>
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
