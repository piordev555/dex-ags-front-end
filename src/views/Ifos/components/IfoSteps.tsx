import React from 'react'
import styled from 'styled-components'
import every from 'lodash/every'
import { Stepper, Step, StepStatus, Card, CardBody, Heading, Text, Button, Link, OpenNewIcon } from '@pancakeswap/uikit'
import { Link as RouterLink } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { BASE_ADD_LIQUIDITY_URL, BASE_SWAP_URL } from 'config'
import { Ifo } from 'config/constants/types'
import { WalletIfoData } from 'views/Ifos/types'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance from 'hooks/useTokenBalance'
import Container from 'components/Layout/Container'
import { useProfile } from 'state/profile/hooks'
import { nftsBaseUrl } from 'views/Nft/market/constants'
import ConnectWalletButton from 'components/ConnectWalletButton'

interface Props {
  ifo: Ifo
  walletIfoData: WalletIfoData
}

const Wrapper = styled.div`
  // background: ${({ theme }) => theme.colors.gradients.bubblegum};
  padding-top: 48px;
  padding-bottom: 48px;

  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const IfoSteps: React.FC<Props> = ({ ifo, walletIfoData }) => {
  const { poolBasic, poolUnlimited } = walletIfoData
  const { hasProfile } = useProfile()
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { balance } = useTokenBalance(ifo.currency.address)
  const stepsValidationStatus = [
    // hasProfile,
    balance.isGreaterThan(0),
    poolBasic.amountTokenCommittedInLP.isGreaterThan(0) || poolUnlimited.amountTokenCommittedInLP.isGreaterThan(0),
    poolBasic.hasClaimed || poolUnlimited.hasClaimed,
  ]

  const getStatusProp = (index: number): StepStatus => {
    const arePreviousValid = index === 0 ? true : every(stepsValidationStatus.slice(0, index), Boolean)
    if (stepsValidationStatus[index]) {
      return arePreviousValid ? 'past' : 'future'
    }
    return arePreviousValid ? 'current' : 'future'
  }

  const renderCardBody = (step: number) => {
    const isStepValid = stepsValidationStatus[step]

    const renderAccountStatus = () => {
      if (!account) {
        return <ConnectWalletButton />
      }

      if (isStepValid) {
        return (
          <Text color="success" bold>
            {t('Profile Active!')}
          </Text>
        )
      }

      return (
        <Button as={RouterLink} to={`${nftsBaseUrl}/profile/${account.toLowerCase()}`}>
          {t('Activate your Profile')}
        </Button>
      )
    }

    switch (step) {
      case 0:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Activate your Profile')}
            </Heading>
            <Text color="textSubtle" small mb="16px">
              {t('You’ll need an active PancakeSwap Profile to take part in an IDO!')}
            </Text>
            {renderAccountStatus()}
          </CardBody>
        )
      case 1:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t(`Get $${ifo.currency.symbol} Tokens`)}
            </Heading>
            <Text color="textSubtle" small>
              {t(`Get $${ifo.currency.symbol} tokens to p articipated in an IDO.`)} <br />
              {t('You’ll spend them to buy IDO sale tokens.')}
            </Text>
            <Button
              as={Link}
              external
              href={`https://app.arthswap.org/#/swap?outputCurrency=${ifo.currency.address}`}
              endIcon={<OpenNewIcon color="white" />}
              mt="16px"
            >
              {t(`Get $${ifo.currency.symbol} tokens`)}
            </Button>
          </CardBody>
        )
      case 2:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t(`Commit $${ifo.currency.symbol} Tokens`)}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                `When the IDO sales are live, you can “commit” your $${ifo.currency.symbol} tokens to buy the tokens being sold.`,
              )}{' '}
            </Text>
          </CardBody>
        )
      case 3:
        return (
          <CardBody>
            <Heading as="h4" color="secondary" mb="16px">
              {t('Claim your tokens and achievement')}
            </Heading>
            <Text color="textSubtle" small>
              {t(
                `After the IDO sales finish, you can claim any IDO tokens that you bought, and any unspent $${ifo.currency.symbol} tokens will be returned to your wallet.`,
              )}
            </Text>
          </CardBody>
        )
      default:
        return null
    }
  }

  return (
    <Wrapper>
      <Container>
        <Heading as="h2" scale="xl" color="secondary" mb="24px" textAlign="center">
          {t('How to Take Part')}
        </Heading>
        <Stepper>
          {stepsValidationStatus.map((_, index) => (
            <Step
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              statusFirstPart={getStatusProp(index)}
              statusSecondPart={getStatusProp(index + 1)}
            >
              <Card>{renderCardBody(index + 1)}</Card>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Wrapper>
  )
}

export default IfoSteps
