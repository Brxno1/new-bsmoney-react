import React, { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
  createdAt: string
}

interface CreateNewTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  loading: boolean
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: CreateNewTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTransactions = useCallback(async (query?: string) => {
    setLoading(true)

    try {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        },
      })

      setTransactions(response.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const createNewTransaction = useCallback(async (data: CreateNewTransactionInput) => {
    const { category, description, price, type } = data

    setLoading(true)
    try {
      const response = await api.post('/transactions', {
        id: Math.floor(Math.random() * new Date().getTime()).toString(),
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((prevTransactions) => [response.data, ...prevTransactions])
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, loading, fetchTransactions, createNewTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
