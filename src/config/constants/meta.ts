import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'AgsFinance',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by AgsFinance), NFTs, and more, on a platform you can trust.',
  image: 'https://AgsFinance.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} | ${t('AgsFinance')}`,
      }
    case '/swap':
      return {
        title: `${t('Exchange')} | ${t('AgsFinance')}`,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')} | ${t('AgsFinance')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')} | ${t('AgsFinance')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')} | ${t('AgsFinance')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')} | ${t('AgsFinance')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t('AgsFinance')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t('AgsFinance')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} | ${t('AgsFinance')}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t('AgsFinance')}`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} | ${t('AgsFinance')}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t('AgsFinance')}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t('AgsFinance')}`,
      }
    case '/launchpad':
      return {
        title: `${t('Initial Coin Offering')} | ${t('AgsFinance')}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t('AgsFinance')}`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} | ${t('AgsFinance')}`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} | ${t('AgsFinance')}`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} | ${t('AgsFinance')}`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('AgsFinance Info & Analytics')}`,
        description: 'View statistics for AgsFinance exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('AgsFinance Info & Analytics')}`,
        description: 'View statistics for AgsFinance exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('AgsFinance Info & Analytics')}`,
        description: 'View statistics for AgsFinance exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} | ${t('AgsFinance')}`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} | ${t('AgsFinance')}`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Your Profile')} | ${t('AgsFinance')}`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} | ${t('AgsFinance')}`,
      }
    default:
      return null
  }
}
