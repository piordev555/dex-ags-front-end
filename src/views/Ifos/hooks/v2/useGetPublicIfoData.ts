import { useEffect, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import { useBlock } from 'state/block/hooks'
import { useLpTokenPrice } from 'state/farms/hooks'
import useRefresh from 'hooks/useRefresh'
import { multicallv2 } from 'utils/multicall'
import ifoV2Abi from 'config/abi/ifoV2.json'
import { BIG_ZERO } from 'utils/bigNumber'
import useBUSDPrice, { useBNBBusdPrice } from 'hooks/useBUSDPrice'
import { PublicIfoData } from '../../types'
import { getStatus } from '../helpers'

// https://github.com/pancakeswap/pancake-contracts/blob/master/projects/ifo/contracts/IFOV2.sol#L431
// 1,000,000,000 / 100
const TAX_PRECISION = 10000000000

const formatPool = (pool) => ({
  raisingAmountPool: pool ? new BigNumber(pool[0].toString()) : BIG_ZERO,
  offeringAmountPool: pool ? new BigNumber(pool[1].toString()) : BIG_ZERO,
  limitPerUserInLP: pool ? new BigNumber(pool[2].toString()) : BIG_ZERO,
  hasTax: pool ? pool[3] : false,
  totalAmountPool: pool ? new BigNumber(pool[4].toString()) : BIG_ZERO,
  sumTaxesOverflow: pool ? new BigNumber(pool[5].toString()) : BIG_ZERO,
})

/**
 * Gets all public data of an IFO
 */
const useGetPublicIfoData = (ifo: Ifo): PublicIfoData => {
  const { address, releaseBlockNumber } = ifo
  // const lpTokenPriceInUsd = useLpTokenPrice(ifo.currency.symbol)
  const lpTokenPriceInUsd = useBUSDPrice(ifo.currency) // for initial IFO

  console.log('lpTokenPrice: ', lpTokenPriceInUsd, lpTokenPriceInUsd?.toSignificant())
  const { fastRefresh } = useRefresh()

  const [state, setState] = useState({
    status: 'idle' as IfoStatus,
    timeRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    poolBasic: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
    },
    poolUnlimited: {
      raisingAmountPool: BIG_ZERO,
      offeringAmountPool: BIG_ZERO,
      limitPerUserInLP: BIG_ZERO,
      taxRate: 0,
      totalAmountPool: BIG_ZERO,
      sumTaxesOverflow: BIG_ZERO,
    },
    startTime: 0,
    endTime: 0,
    numberPoints: 0,
  })
  // const { currentBlock } = useBlock()
  const [currentTime, setCurrentTime] = useState(new Date().getTime() / 1000)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentTime(new Date().getTime() / 1000)
    }, 30000)
    return () => {
      clearInterval(id)
    }
  }, [])

  const fetchIfoData = useCallback(async () => {
    const ifoCalls = [
      {
        address,
        name: 'startTime',
      },
      {
        address,
        name: 'endTime',
      },
      {
        address,
        name: 'viewPoolInformation',
        params: [0],
      },
      {
        address,
        name: 'viewPoolInformation',
        params: [1],
      },
      {
        address,
        name: 'viewPoolTaxRateOverflow',
        params: [1],
      },
      {
        address,
        name: 'numberPoints',
      },
    ]

    const [startTime, endTime, poolBasic, poolUnlimited, taxRate, numberPoints] = await multicallv2(ifoV2Abi, ifoCalls)

    const poolBasicFormatted = formatPool(poolBasic)
    const poolUnlimitedFormatted = formatPool(poolUnlimited)

    const startBlockTime = startTime ? startTime[0].toNumber() : 0
    const endBlockTime = endTime ? endTime[0].toNumber() : 0
    const taxRateNum = taxRate ? taxRate[0].div(TAX_PRECISION).toNumber() : 0

    const status = getStatus(currentTime, startBlockTime, endBlockTime)
    const totalTime = endBlockTime - startBlockTime
    const timeRemaining = endBlockTime - currentTime

    // Calculate the total progress until finished or until start
    const progress =
      currentTime > startBlockTime
        ? ((currentTime - startBlockTime) / totalTime) * 100
        : ((currentTime - releaseBlockNumber) / (startBlockTime - releaseBlockNumber)) * 100

    setState((prev) => ({
      ...prev,
      secondsUntilEnd: timeRemaining,
      secondsUntilStart: startBlockTime - currentTime,
      poolBasic: { ...poolBasicFormatted, taxRate: 0 },
      poolUnlimited: { ...poolUnlimitedFormatted, taxRate: taxRateNum },
      status,
      progress,
      timeRemaining,
      startBlockTime,
      endBlockTime,
      numberPoints: numberPoints ? numberPoints[0].toNumber() : 0,
    }))
  }, [address, currentTime, releaseBlockNumber])

  useEffect(() => {
    fetchIfoData()
  }, [fetchIfoData, fastRefresh])

  return {
    ...state,
    currencyPriceInUSD: lpTokenPriceInUsd ? new BigNumber(lpTokenPriceInUsd.toSignificant()) : BIG_ZERO,
    fetchIfoData,
  }
}

export default useGetPublicIfoData
