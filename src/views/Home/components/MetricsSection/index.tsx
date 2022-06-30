import React from 'react'
import {
  Heading,
  Flex,
  Text,
  Skeleton,
  ChartIcon,
  CommunityIcon,
  SwapIcon,
  CurrencyIcon,
  SunIcon,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetStats } from 'hooks/api'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber, getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import tokens, { mainnetTokens } from 'config/constants/tokens'
import { useBurnedBalance, useTotalSupply } from 'hooks/useTokenBalance'
import { usePriceCakeBusd } from 'state/farms/hooks'
import CakeDataRow from '../CakeDataRow'
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import GradientLogo from '../GradientLogoSvg'

// Values fetched from bitQuery effective 6/9/21
const txCount = 30841921
const addressCount = 2751624

const Stats = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const { theme } = useTheme()

  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  // const trades = formatLocalisedCompactNumber(txCount)
  // const users = formatLocalisedCompactNumber(addressCount)
  const trades = 1000
  const users = 1000
  // const tvlString = 1000

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  // const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <SwapIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }

  const MarketCapData: IconCardData = {
    icon: <CurrencyIcon color="success" width="36px" />,
  }

  const BurnCarddata: IconCardData = {
    icon: <SunIcon color="warning" width="36px" />,
  }

  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(tokens.cake.address))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0
  const cakeSupplyText = formatLocalisedCompactNumber(cakeSupply)
  const cakePriceBusd = usePriceCakeBusd()
  const mcap = cakePriceBusd.times(cakeSupply)
  const mcapString = formatLocalisedCompactNumber(mcap.toNumber())

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      {/* <GradientLogo height="48px" width="48px" mb="24px" /> */}
      <Logo src="/images/teams/ags.png" />
      <Heading textAlign="center" scale="xl">
        {t('#1 DeFi Ecosystem')}
      </Heading>
      <Heading textAlign="center" scale="xl" mb="32px">
        {t('Live On Astar Network.')}
      </Heading>
      <Text textAlign="center" color="textSubtle">
        {t('AGS Finance is the first DEX/AMM to introduce protocol owned liquidity on Astar Network. ')}
      </Text>
      <Flex flexWrap="wrap">
        <Text display="inline" textAlign="center" color="textSubtle" mb="20px">
          {/* {entrusting}
          <>{data ? <>{tvlString}</> : <Skeleton display="inline-block" height={16} width={70} mt="2px" />}</>
          {inFunds} */}
          Other offerings include, lowest trading fees of 0.17%, ensuring that users gets the best rate possible when
          trading on AGS Finance
        </Text>
      </Flex>

      <Flex flexDirection={['column', null, null, 'row']} mt={[null, null, null, '32px']}>
        <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('$%tvl%', { tvl: tvlString })}
            bodyText={t('Total Value Locked')}
            highlightColor={theme.colors.failure}
          />
        </IconCard>
        <IconCard
          {...MarketCapData}
          mr={[null, null, null, '16px']}
          ml={[null, null, null, '16px']}
          mb={['16px', null, null, '0']}
          mt={['16px', null, null, '0']}
        >
          <StatCardContent
            headingText={t(`%marketCap%`, { marketCap: mcapString })}
            bodyText={t(`$${mainnetTokens.cake.symbol} Market Cap`)}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t(`%circulating%`, { circulating: cakeSupplyText })}
            bodyText={t(`$${mainnetTokens.cake.symbol} Circulating Balance`)}
            highlightColor={theme.colors.success}
          />
        </IconCard>
        <IconCard {...BurnCarddata} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t(`%burnedBalance%`, { burnedBalance })}
            bodyText={t(`$${mainnetTokens.cake.symbol} Burned`)}
            highlightColor={theme.colors.warning}
          />
        </IconCard>
      </Flex>
    </Flex>
  )
}

const Logo = styled.img`
  width: 64px;
  height: 64px;
`
export default Stats
