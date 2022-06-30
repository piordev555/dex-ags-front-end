import React from 'react'
import { Text, Flex, Box, Skeleton } from '@pancakeswap/uikit'
import { PublicIfoData } from 'views/Ifos/types'
import { useTranslation } from 'contexts/Localization'
import { Ifo, PoolIds } from 'config/constants/types'
import { getBalanceNumber, formatNumber } from 'utils/formatBalance'
import { SkeletonCardDetails } from './Skeletons'

export interface IfoCardDetailsProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
}

export interface FooterEntryProps {
  label: string
  value: string | number
}

const FooterEntry: React.FC<FooterEntryProps> = ({ label, value }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Text small color="textSubtle">
        {label}
      </Text>
      {value ? (
        <Text small textAlign="right">
          {value}
        </Text>
      ) : (
        <Skeleton height={21} width={80} />
      )}
    </Flex>
  )
}

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ poolId, ifo, publicIfoData }) => {
  const { t } = useTranslation()
  const { status, currencyPriceInUSD } = publicIfoData
  const poolCharacteristic = publicIfoData[poolId]

  /* Format start */
  const maxLpTokens = getBalanceNumber(poolCharacteristic.limitPerUserInLP, ifo.currency.decimals)
  const taxRate = `${poolCharacteristic.taxRate}%`

  const totalCommittedPercent = poolCharacteristic.totalAmountPool
    .div(poolCharacteristic.raisingAmountPool)
    .times(100)
    .toFixed(2)
  const totalLPCommitted = getBalanceNumber(poolCharacteristic.totalAmountPool, ifo.currency.decimals)
  const totalLPCommittedInUSD = currencyPriceInUSD.times(totalLPCommitted)
  const totalCommitted = `~$${formatNumber(totalLPCommittedInUSD.toNumber(), 2, 2)} (${totalCommittedPercent}%)`

  const getTimeInterval = (startTime: number, endTime: number): string => {
    const diff = endTime - startTime // second
    const d = diff / (24 * 3600)
    const h = (diff % (24 * 3600)) / 3600
    const m = (diff % 3600) / 60
    let result = ''
    if (d > 0) {
      result += `${d}Day `
    }
    if (h > 0 || m > 0) {
      result += `${h}Hours `
    }
    if (m > 0) {
      result += `${m}Minutes`
    }
    return result
  }
  const options = {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  /* Format end */

  const renderBasedOnIfoStatus = () => {
    if (status === 'coming_soon') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].raiseAmount} />
          {/* <FooterEntry label={t('AGS to burn:')} value={ifo[poolId].cakeToBurn} /> */}
          <FooterEntry
            label={t(`Funds to raise (in ${ifo.currency.symbol}):`)}
            value={`${ifo[poolId].raiseAmountInCurrency} ${ifo.currency.symbol}`}
          />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice} `}
          />
          <FooterEntry label={t('Launchpad Duration:')} value={`${getTimeInterval(ifo.startTime, ifo.endTime)}`} />
          <FooterEntry
            label={t('Launchpad starts at:')}
            // @ts-ignore
            value={`${new Date(ifo.startTime * 1000).toLocaleDateString('en-US', options)} UTC`}
          />
          <FooterEntry
            label={t('Launchpad ends at:')}
            // @ts-ignore
            value={`${new Date(ifo.endTime * 1000).toLocaleDateString('en-US', options)} UTC`}
          />
        </>
      )
    }
    if (status === 'live') {
      return (
        <>
          <FooterEntry
            label={t(`Funds to raise (in ${ifo.currency.symbol}):`)}
            value={`${ifo[poolId].raiseAmountInCurrency} ${ifo.currency.symbol}`}
          />
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice} `}
          />
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('Additional fee:')} value={taxRate} />}
          <FooterEntry label={t('Total committed:')} value={currencyPriceInUSD.gt(0) ? totalCommitted : null} />
        </>
      )
    }
    if (status === 'finished') {
      return (
        <>
          {poolId === PoolIds.poolBasic && <FooterEntry label={t('Max. LP token entry')} value={maxLpTokens} />}
          {poolId === PoolIds.poolUnlimited && <FooterEntry label={t('Additional fee:')} value={taxRate} />}
          <FooterEntry label={t('Total committed:')} value={currencyPriceInUSD.gt(0) ? totalCommitted : null} />
          <FooterEntry label={t('Funds to raise:')} value={ifo[poolId].raiseAmount} />
          {/* <FooterEntry label={t('AGS to burn:')} value={ifo[poolId].cakeToBurn} /> */}
          <FooterEntry
            label={t('Price per %symbol%:', { symbol: ifo.token.symbol })}
            value={`$${ifo.tokenOfferingPrice ? ifo.tokenOfferingPrice : '?'}`}
          />
        </>
      )
    }
    return <SkeletonCardDetails />
  }

  return <Box paddingTop="24px">{renderBasedOnIfoStatus()}</Box>
}

export default IfoCardDetails
