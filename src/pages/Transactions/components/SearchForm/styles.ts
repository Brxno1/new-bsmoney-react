import styled, { css } from 'styled-components'

export const SearchFormContainer = styled.form`
  ${({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;

    input {
      flex: 1;
      border-radius: 6px;
      border: none;
      outline: none;
      background-color: ${theme['gray-900']};
      color: ${theme['gray-300']};
      padding: 1rem;

      &:focus {
        border: 1px solid ${theme['green-300']};
        outline: none;
      }

      &::placeholder {
        color: ${theme['gray-500']};
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      border: 0;
      padding: 1rem;
      background: transparent;
      border: 1px solid ${theme['green-300']};
      color: ${theme['green-300']};
      font-weight: bold;
      border-radius: 6px;
      cursor: grab;

      &[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: ${theme['gray-900']};
      }

      &:not(:disabled):hover {
        background: ${theme['green-500']};
        color: ${theme.white};
        border-color: ${theme['green-500']};
        transition: all 0.2s ease-in-out;
      }
    }
  `}
`
