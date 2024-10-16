import styled, { css } from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`
export const TransactionsTable = styled.table`
  ${({ theme }) => css`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
      padding: 1.25rem 2rem;
      background-color: ${theme['gray-700']};

      &:first-child {
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  `}
`

interface PriceHighlightProps {
  $variantColor: 'income' | 'outcome'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  ${({ theme, $variantColor }) => css`
    color: ${$variantColor === 'income' ? theme['green-300'] : theme['red-300']};
  `}
`

export const NotTransactionsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem auto 0;
  padding: 1rem 1.5rem;
  margin: 0 auto;
  background-color: ${(props) => props.theme['gray-700']};
`
