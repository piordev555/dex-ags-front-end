import { ChainId, Token } from '@pancakeswap/sdk'
import { serializeToken } from 'state/user/hooks/helpers'
import { SerializedToken } from './types'

const { MAINNET, TESTNET } = ChainId

interface TokenList {
  [symbol: string]: Token
}

interface SerializedTokenList {
  [symbol: string]: SerializedToken
}

export const NATIVE_CURRENCY = {
  symbol: 'ASTR',
  wrapSymbol: 'WASTR',
  address: '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
}

export const LP_TOKEN = {
  name: 'AGS LPs',
  symbol: 'AGS-LP',
}

export const mainnetTokens = {
  wbnb: new Token(
    MAINNET,
    '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    18,
    'WASTR',
    'Wrapped ASTR',
    'https://www.astar.com/',
  ),
  // bnb here points to the wbnb contract. Wherever the currency BNB is required, conditional checks for the symbol 'BNB' can be used
  bnb: new Token(MAINNET, '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720', 18, 'ASTR', 'ASTR', 'https://www.astar.com/'),
  cake: new Token(
    MAINNET,
    '0x233729E6A3A5DA3Cf6ee5c2B85C56ab3997FD001',
    18,
    'AGS',
    'AGS Token',
    'https://ags.finance/',
  ),
  busd: new Token(
    MAINNET,
    '0x4Bf769b05E832FCdc9053fFFBC78Ca889aCb5E1E',
    18,
    'BUSD',
    'Astar USD',
    'https://www.paxos.com/busd/',
  ),
  dai: new Token(
    MAINNET,
    '0x6De33698e9e9b787e09d3Bd7771ef63557E148bb',
    18,
    'DAI',
    'Dai Stablecoin',
    'https://www.makerdao.com/',
  ),
  usdt: new Token(MAINNET, '0x3795C36e7D12A8c252A20C5a7B455f7c57b60283', 6, 'USDT', 'Tether USD', 'https://tether.to/'),
  wbtc: new Token(
    MAINNET,
    '0xad543f18cFf85c77E140E3E5E3c3392f6Ba9d5CA',
    18,
    'WBTC',
    'Astar BTC',
    'https://bitcoin.org/',
  ),

  eth: new Token(
    MAINNET,
    '0x81ECac0D6Be0550A00FF064a4f9dd2400585FE9c',
    18,
    'WETH',
    'Astar-Peg Ethereum Token',
    'https://ethereum.org/en/',
  ),
  usdc: new Token(
    MAINNET,
    '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    6,
    'USDC',
    'Astar-Peg USD Coin',
    'https://www.centre.io/usdc',
  ),

  wsdn: new Token(
    MAINNET,
    '0x75364D4F779d0Bd0facD9a218c67f87dD9Aff3b4',
    18,
    'SDN',
    'Shiden Network Coin',
    'https://www.centre.io/usdc',
  ),
  matic: new Token(
    MAINNET,
    '0xdd90E5E87A2081Dcf0391920868eBc2FFB81a1aF',
    18,
    'Matic',
    'Polygon Coin',
    'https://www.centre.io/usdc',
  ),
  BNB: new Token(
    MAINNET,
    '0x7f27352D5F83Db87a5A3E00f4B07Cc2138D8ee52',
    18,
    'BNB',
    'Binance Coin',
    'https://www.centre.io/usdc',
  ),
  syrup: new Token(
    MAINNET,
    '0xb1851d6b395975893f9d345043c9d9480934d600',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://ags.finance/',
  ),
  lynx: new Token(
    MAINNET,
    '0x81bC9336f22D832555ceA0Ad84A3FD7F7426cf47',
    9,
    'LYNX',
    'Astar Lynx',
    'https://ags.finance',
  ),
}

export const testnetTokens = {
  wbnb: new Token(
    TESTNET,
    '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.astar.com/',
  ),
  cake: new Token(
    TESTNET,
    '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    18,
    'CAKE',
    'PancakeSwap Token',
    'https://ags.finance/',
  ),
  busd: new Token(
    TESTNET,
    '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
    18,
    'BUSD',
    'Astar USD',
    'https://www.paxos.com/busd/',
  ),
  syrup: new Token(
    TESTNET,
    '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    18,
    'SYRUP',
    'SyrupBar Token',
    'https://ags.finance/',
  ),
  bake: new Token(
    TESTNET,
    '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
}

const tokens = (): TokenList => {
  const chainId = process.env.REACT_APP_CHAIN_ID

  // If testnet - return list comprised of testnetTokens wherever they exist, and mainnetTokens where they don't
  if (parseInt(chainId, 10) === ChainId.TESTNET) {
    return Object.keys(mainnetTokens).reduce((accum, key) => {
      return { ...accum, [key]: testnetTokens[key] || mainnetTokens[key] }
    }, {})
  }

  return mainnetTokens
}

export const serializeTokens = (): SerializedTokenList => {
  const unserializedTokens = tokens()
  const serializedTokens = Object.keys(unserializedTokens).reduce((accum, key) => {
    return { ...accum, [key]: serializeToken(unserializedTokens[key]) }
  }, {})

  return serializedTokens
}

export default tokens()
