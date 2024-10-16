import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, Spinner, X } from 'phosphor-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTransactionContext } from '../../hooks/useTransactionContext'
import {
  CloseModalButton,
  Content,
  LoadingSpinner,
  MessageError,
  OverLay,
  TransactionTypeButton,
  TransactionTypeContainer,
} from './styles'

const newTransactionModalSchema = z.object({
  description: z.string().min(3, 'A descrição deve ter pelo menos 3 caracteres'),
  price: z.number().min(1, 'O valor deve ser maior que zero'),
  category: z.string().min(3, 'Selecione uma categoria'),
  type: z.enum(['income', 'outcome']),
})

type newTransactionFormInput = z.infer<typeof newTransactionModalSchema>

export function NewTransactionModal() {
  const [loading, setLoading] = useState(false)

  const { createNewTransaction } = useTransactionContext()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newTransactionFormInput>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      description: '',
      price: 0,
      category: '',
      type: 'income',
    },
  })

  async function handleCreateNewTransaction(data: newTransactionFormInput) {
    const { description, price, category, type } = data

    setLoading(true)
    try {
      await createNewTransaction({ description, price, category, type })
      reset()
    } catch (err: unknown) {
      const error = err as Error
      throw new Error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Portal>
      <OverLay />

      <Content aria-describedby="dialog-description">
        <CloseModalButton>
          <X size={24} />
        </CloseModalButton>
        <Dialog.Title>Nova transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input type="text" placeholder="Descrição" required {...register('description')} />
          {errors.description && <MessageError>{errors.description.message}</MessageError>}

          <input
            type="number"
            placeholder="Valor"
            required
            {...register('price', { valueAsNumber: true })}
          />
          {errors.price && <MessageError>{errors.price.message}</MessageError>}

          <input type="text" placeholder="Categoria" required {...register('category')} />
          {errors.category && <MessageError>{errors.category.message}</MessageError>}

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionTypeContainer onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton type="button" $variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton type="button" $variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionTypeContainer>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            {!loading && <span>Cadastrar</span>}
            {loading && (
              <LoadingSpinner>
                <Spinner size={32} />
              </LoadingSpinner>
            )}
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
