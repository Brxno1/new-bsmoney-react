import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const OverLay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
`

export const CloseModalButton = styled(Dialog.Close)`
  position: absolute;
  background-color: transparent;
  color: ${(props) => props.theme['gray-500']};
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
`

export const Content = styled(Dialog.Content)`
  ${({ theme }) => css`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background-color: ${theme['gray-800']};

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    form {
      margin-top: 2rem;

      display: flex;
      flex-direction: column;
      gap: 1rem;

      input {
        border-radius: 6px;
        border: 0;
        padding: 1rem;
        background-color: ${theme['gray-900']};
        color: ${theme['gray-300']};

        &::placeholder {
          color: ${theme['gray-500']};
        }
      }

      button[type='submit'] {
        height: 58px;
        border: 0;
        background-color: ${theme['green-500']};
        color: ${theme.white};
        font-weight: bold;
        padding: 0 1.25rem;
        cursor: pointer;
        border-radius: 6px;
        margin-top: 1.5rem;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          background-color: ${theme['green-700']};
          transition: background-color 0.2s;
        }
      }
    }
  `}
`

export const TransactionTypeContainer = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransactionTypeButtonProps {
  $variant: 'income' | 'outcome'
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
  ${({ theme, $variant }) => css`
    background-color: ${theme['gray-700']};
    color: ${theme['gray-300']};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 6px;
    curser: pointer;
    border: 0;
    transition: all 0.2s;

    &[data-state='checked'] {
      background-color: ${$variant === 'income' ? theme['green-500'] : theme['red-500']};
      color: ${theme.white};

      svg {
        color: ${theme.white};
      }
    }

    &[data-state='unchecked']:hover {
      background-color: ${lighten(0.1, theme['gray-700'])};
    }

    svg {
      color: ${$variant === 'income' ? theme['green-300'] : theme['red-300']};
    }
  `}
`

export const MessageError = styled.span`
  color: ${(props) => props.theme['red-500']};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

export const LoadingSpinner = styled.div`
  animation: spinner 1s linear infinite;

  @keyframes spinner {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`
