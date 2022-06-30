import { MenuItemsType, DropdownMenuItemType } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { nftsBaseUrl } from 'views/Nft/market/constants'

export type ConfigMenuItemsType = MenuItemsType & { hideSubNav?: boolean }

const config: (t: ContextApi['t']) => ConfigMenuItemsType[] = (t) => [
  {
    label: t('Trade'),
    href: '/swap',
    icon: 'Swap',
    items: [
      {
        label: t('Swap'),
        href: '/swap',
      },
      {
        label: t('Liquidity'),
        href: '/liquidity',
      },
    ],
  },
  {
    label: t('Earn'),
    href: '/farms',
    icon: 'Earn',
    items: [
      {
        label: t('Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
    ],
  },
  {
    label: t('Launchpad'),
    href: '/launchpad',
    icon: 'Currency',
    showItemsOnMobile: false,
    items: [],
  },

  // {
  //   label: t('Win'),
  //   href: '/prediction',
  //   icon: 'Trophy',
  //   items: [
  //     {
  //       label: t('Prediction (BETA)'),
  //       href: '/prediction',
  //     },
  //     {
  //       label: t('Lottery'),
  //       href: '/lottery',
  //     },
  //   ],
  // },
  // {
  //   label: t('NFT'),
  //   href: `${nftsBaseUrl}`,
  //   icon: 'Nft',
  //   items: [
  //     {
  //       label: t('Overview'),
  //       href: `${nftsBaseUrl}`,
  //       status: {
  //         text: t('Live'),
  //         color: 'failure',
  //       },
  //     },
  //     {
  //       label: t('Collections'),
  //       href: `${nftsBaseUrl}/collections`,
  //     },
  //   ],
  // },
  {
    label: '',
    href: '',
    icon: 'More',
    hideSubNav: true,
    items: [
      // {
      //   label: t('Info'),
      //   href: '/info',
      // },
      {
        label: t('Faucet'),
        href: 'https://portal.astar.network/#/balance/wallet',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Bridge'),
        href: 'https://cbridge.celer.network/#/transfer',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Dexscreener'),
        href: 'https://dexscreener.com/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Medium'),
        href: 'https://altergrimace.medium.com/',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Docs'),
        href: 'https://agsfinance.gitbook.io',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Token Whitelist'),
        href: 'https://forms.gle/EB8vuYtBKHTcqg7J6',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
      {
        label: t('Github'),
        href: 'https://github.com/AlterGrimaceSociety/AGS-Finance-Contracts',
        type: DropdownMenuItemType.EXTERNAL_LINK,
      },
    ],
  },
]

export default config
