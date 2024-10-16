import * as Dialog from '@radix-ui/react-dialog'

import logoIcon from '../../assets/logo-ignite.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import * as S from './styles'

export function Header() {
  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <img src={logoIcon} alt="logo" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <S.NewTransactionButton>Nova transação</S.NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
