import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Flex, Text, Button, Modal, LinkExternal, CalculateIcon, IconButton, ModalBody } from '@pancakeswap/uikit'
import { ModalActions, ModalInput } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'

const CustomModal = styled(Modal)`
  ${({ theme }) => theme.mediaQueries.xl} {
    min-width: 700px;
  }
`

interface NFTModalProps {
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  nfts: {
    boosts: BigNumber
    slots: any
    tokenIds: any
  }
  slotNumber: number
}

const NFTModal: React.FC<NFTModalProps> = ({ onConfirm, onDismiss, nfts, slotNumber }) => {
  const [val, setVal] = useState('')
  const { toastSuccess, toastError } = useToast()
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const isDeposit = !nfts.slots?.[slotNumber]
  const label = isDeposit ? 'Deposit NFT' : 'Withdraw NFT'

  return (
    <CustomModal title={t(`${label} ${slotNumber + 1}`)} onDismiss={onDismiss}>
      {isDeposit && (
        <ModalBody minHeight="100px" alignItems="center" justifyContent="center">
          <Text fontSize="28px">Coming Soon</Text>
        </ModalBody>
      )}
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%" disabled={pendingTx}>
          {t('Cancel')}
        </Button>
        <Button
          width="100%"
          disabled={
            // pendingTx || !lpTokensToStake.isFinite() || lpTokensToStake.eq(0) || lpTokensToStake.gt(fullBalanceNumber)
            false
          }
          onClick={async () => {
            setPendingTx(true)
            try {
              await onConfirm(val)
              // toastSuccess(t('Deposited!'), t('Your NFT has beed deposited successfully.'))
              onDismiss()
            } catch (e) {
              toastError(
                t('Error'),
                t('Please try again. Confirm the transaction and make sure you are paying enough gas!'),
              )
              console.error(e)
            } finally {
              setPendingTx(false)
            }
          }}
        >
          {pendingTx ? t('Confirming') : t('Confirm')}
        </Button>
      </ModalActions>
    </CustomModal>
  )
}

export default NFTModal
