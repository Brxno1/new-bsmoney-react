import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTransactionContext } from '../../../../hooks/useTransactionContext'
import * as S from './styles'

const searchFormSchema = z.object({
  query: z.string().min(3),
})

type SearchFormInput = z.infer<typeof searchFormSchema>

export function SearchForm() {
  const { fetchTransactions } = useTransactionContext()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: '',
    },
  })

  const buttonRef = React.useRef<HTMLButtonElement>(null)

  async function handleSearchTransactions(data: SearchFormInput) {
    try {
      await fetchTransactions(data.query)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  }

  function handleButtonSearchFocus(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      buttonRef.current?.focus()
    }

    if (event.key === 'Escape') {
      console.log(event.key)
    }
  }

  return (
    <S.SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        onKeyDown={handleButtonSearchFocus}
        {...register('query')}
      />

      <button ref={buttonRef} type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  )
}
