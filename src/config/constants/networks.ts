import { ChainId } from '@pancakeswap/sdk'

const NETWORK_URLS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: process.env.REACT_APP_NODE_PRODUCTION,
  [ChainId.TESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
}

export default NETWORK_URLS
