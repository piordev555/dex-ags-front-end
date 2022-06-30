import { Currency, ETHER, Token } from '@pancakeswap/sdk'
import { NATIVE_CURRENCY } from 'config/constants/tokens'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return NATIVE_CURRENCY.symbol
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
