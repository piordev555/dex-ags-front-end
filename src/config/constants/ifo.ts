import { Token, ChainId } from '@pancakeswap/sdk'
import tokens, { mainnetTokens } from './tokens'
import farms from './farms'
import { Ifo } from './types'

const cakeBnbLpToken = new Token(ChainId.MAINNET, farms[1].lpAddresses[ChainId.MAINNET], 18, farms[1].lpSymbol)
const WASTR_USDT = new Token(ChainId.MAINNET, farms[3].lpAddresses[ChainId.MAINNET], 18, farms[3].lpSymbol)

const ifos: Ifo[] = [
  {
    id: 'AGS-1',
    address: '0xc1e6841D2ea2B4ff8da1b0C98d4471d32Ac22586',
    isActive: true,
    name: 'AGS Finance',
    poolBasic: {
      saleAmount: '1,000,000 AGS',
      raiseAmount: '$2,100,000',
      cakeToBurn: '$2,100,000',
      distributionRatio: 0.3,
    },
    poolUnlimited: {
      saleAmount: '5,000,000 AGS',
      raiseAmount: '$300,000',
      raiseAmountInCurrency: '300,000',
      cakeToBurn: '$0',
      distributionRatio: 1,
    },
    currency: mainnetTokens.usdc,
    token: tokens.cake,
    releaseBlockNumber: 1650896000,
    campaignId: '0',
    articleUrl: 'https://altergrimace.medium.com/ags-finance-amm-dex-on-astar-network-8b1295e5b170',
    tokenOfferingPrice: 0.06,
    version: 2,
    startTime: 1651244400,
    endTime: 1651417200,
  },
]

export default ifos
