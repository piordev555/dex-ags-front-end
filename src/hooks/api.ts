import { useEffect, useState } from 'react'

/* eslint-disable camelcase */
export interface DeBankTvlResponse {
  // id: string
  // chain: string
  // name: string
  // site_url: string
  // logo_url: string
  // has_supported_portfolio: boolean
  tvl: number
}

export const useGetStats = () => {
  const [data, setData] = useState<DeBankTvlResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.llama.fi/tvl/ags-finance')
        const responseData: number = await response.json()

        setData({
          tvl: responseData,
        })
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}
