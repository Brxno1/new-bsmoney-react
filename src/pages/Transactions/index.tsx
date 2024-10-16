import { Header } from '../../components/Header'
import { Sumary } from '../../components/Sumary'
import { useTransactionContext } from '../../hooks/useTransactionContext'
import { dateFormatter, priceFormatter } from '../../utils/Formatter'
import { SearchForm } from './components/SearchForm'
import * as S from './styles'

export function Transactions() {
  const { transactions, loading } = useTransactionContext()

  return (
    <>
      <Header />
      <Sumary />

      <S.TransactionsContainer>
        <SearchForm />

        <S.TransactionsTable>
          <tbody>
            {!loading &&
              transactions.length >= 1 &&
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td width={'50%'}>{transaction.description}</td>
                  <td>
                    <S.PriceHighlight $variantColor={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </S.PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              ))}
          </tbody>
        </S.TransactionsTable>

        {!loading && transactions.length <= 0 && (
          <S.NotTransactionsContainer>
            <h2>Não há nenhuma transação</h2>
          </S.NotTransactionsContainer>
        )}
      </S.TransactionsContainer>
    </>
  )
}
