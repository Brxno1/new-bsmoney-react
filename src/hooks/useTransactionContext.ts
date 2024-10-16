import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '../contexts/TransactionsContext'

export const useTransactionContext = () => {
  const context = useContextSelector(TransactionsContext, (context) => ({
    transactions: context.transactions,
    loading: context.loading,
    createNewTransaction: context.createNewTransaction,
    fetchTransactions: context.fetchTransactions,
  }))

  if (!context) {
    throw new Error('useTransactionContext must be used within a <TransactionsProvider />')
  }

  return context
}
