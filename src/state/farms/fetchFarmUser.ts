import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'
import { getMasterchefContract } from 'utils/contractHelpers'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()
  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingAgs',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const fetchFarmUserNFTs = async (account: string, farmsToFetch: SerializedFarmConfig[]) => {
  const masterChefAddress = getMasterChefAddress()

  const boostCalls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getBoost',
      params: [account, farm.pid],
    }
  })

  const slotsCalls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getSlots',
      params: [account, farm.pid],
    }
  })

  const tokenIdsCalls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'getTokenIds',
      params: [account, farm.pid],
    }
  })

  const boosts = await multicall(masterchefABI, boostCalls)
  const slots = await multicall(masterchefABI, slotsCalls)
  const tokenIds = await multicall(masterchefABI, tokenIdsCalls)
  const parsedBoosts = boosts.map((boost) => {
    return new BigNumber(boost).toJSON()
  })
  return { boosts: parsedBoosts, slots, tokenIds }
}
