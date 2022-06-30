import { mainnetTokens } from 'config/constants/tokens'
import { SalesSectionProps } from '.'

export const swapSectionData: SalesSectionProps = {
  headingText: 'NFT Integrated DEX/AMM.',
  bodyText: 'Trade any token on Astar Network in seconds, just by connecting your wallet.',
  reverse: false,
  primaryButton: {
    to: '/swap',
    text: 'Trade Now',
    external: false,
  },
  secondaryButton: {
    to: 'https://agsfinance.gitbook.io/docs//',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/trade/',
    attributes: [
      { src: 'ASTR', alt: 'ASTR token' },
      { src: 'ETH', alt: 'ETH token' },
      { src: 'AGS', alt: 'AGS token' },
    ],
  },
}

export const earnSectionData: SalesSectionProps = {
  headingText: `Earn passive income by staking your crypto asset.`,
  bodyText: 'AGS Finance makes it easy to make your crypto work for you. Simply stake and enjoy your rewards.',
  reverse: true,
  primaryButton: {
    to: '/farms',
    text: 'Explore',
    external: false,
  },
  secondaryButton: {
    to: 'https://agsfinance.gitbook.io/docs/products/yield-farming',
    text: 'Learn',
    external: true,
  },
  images: {
    path: '/images/home/earn/',
    attributes: [
      { src: 'pie', alt: 'Pie chart' },
      { src: 'stonks', alt: 'Stocks chart' },
      { src: 'AGS', alt: 'Folder with ags token' },
    ],
  },
}

export const cakeSectionData: SalesSectionProps = {
  headingText: `#1 DeFi Ecosystem`,
  bodyText: `${mainnetTokens.cake.symbol} is the main token of the AGS Finance ecosystem. Trade, Farm, Stake, IDO/IFO … $AGS brings along many utilities!`,
  reverse: false,
  primaryButton: {
    to: `/swap?outputCurrency=${mainnetTokens.cake.address}`,
    text: `Buy ${mainnetTokens.cake.symbol}`,
    external: false,
  },
  secondaryButton: {
    to: 'https://agsfinance.gitbook.io/docs/tokenomics/usdags',
    text: 'Learn',
    external: true,
  },

  images: {
    path: '/images/home/cake/',
    attributes: [
      { src: 'bottom-right', alt: 'Small 3d ags' },
      { src: 'top-right', alt: 'Small 3d ags' },
      { src: 'AGS', alt: 'AGS token' },
      { src: 'top-left', alt: 'Small 3d ags' },
    ],
  },
}
