// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.
import tokens, { NATIVE_CURRENCY } from 'config/constants/tokens'

const getLiquidityUrlPathParts = ({
  quoteTokenAddress,
  tokenAddress,
}: {
  quoteTokenAddress: string
  tokenAddress: string
}): string => {
  const wBnbAddress = tokens.wbnb.address
  const firstPart = !quoteTokenAddress || quoteTokenAddress === wBnbAddress ? NATIVE_CURRENCY.symbol : quoteTokenAddress
  const secondPart = !tokenAddress || tokenAddress === wBnbAddress ? NATIVE_CURRENCY.symbol : tokenAddress
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
