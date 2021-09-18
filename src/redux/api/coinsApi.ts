import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CoinDefaultType } from '@customtypes/coins/coin'
import { BASE_URL } from '@constants/config'

const coinsApi = createApi({
  reducerPath: 'coinsApi',
  tagTypes: ['Coins'],
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchCoins: builder.query<string, void>({
      query: () => 'coins/list/?include_platform=false',
      transformResponse: (response: CoinDefaultType[]) => {
        let ids = ''
        response.forEach((coin) => {
          ids = `${ids}${coin?.id},`
        })
        return ids
      },
    }),
  }),
})

const { useFetchCoinsQuery } = coinsApi

export { coinsApi, useFetchCoinsQuery }
