import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'

import { useSummary } from '../../hooks/useSummary'
import { priceFormatter } from '../../utils/Formatter'
import * as S from './styles'

export function Sumary() {
  const { summary } = useSummary()

  return (
    <S.SumaryContainer>
      <S.SumaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00B37E" />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SumaryCard>

      <S.SumaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#F75A68" />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SumaryCard>

      <S.SumaryCard $variantColor="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#FFF" />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SumaryCard>
    </S.SumaryContainer>
  )
}
