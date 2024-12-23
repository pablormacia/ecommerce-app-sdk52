import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
    reducerPath: 'shopApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommerce-app-sdk52-58628-default-rtdb.firebaseio.com/' }),
    endpoints: (builder) => ({
      getCategories: builder.query({
        query: () => `categories.json`,
      }),
    }),
  })

  export const { useGetCategoriesQuery } = shopApi