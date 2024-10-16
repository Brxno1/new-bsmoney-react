import styled, { css } from 'styled-components'

export const SumaryContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`

interface SumaryCardProps {
  $variantColor?: 'green' | 'red'
}

export const SumaryCard = styled.div<SumaryCardProps>`
  ${({ theme, $variantColor }) => css`
    background-color: ${$variantColor ? theme['green-700'] : theme['gray-700']};
    border-radius: 6px;
    padding: 2rem;

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: ${theme['gray-300']};
    }

    strong {
      display: block;
      margin-top: 1rem;
      font-size: 2rem;
    }
  `}
`
