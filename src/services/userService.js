import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ecommerce-app-sdk52-58628-default-rtdb.firebaseio.com/' }),
  endpoints: (builder) => ({
    putProfilePicture: builder.mutation({
      query: ({image,localId}) => ({
        url: `profilesPictures/${localId}.json`,
        method: "PUT",
        body: {
          image
        }
      }),
    }),
    getProfilePicture: builder.query({
        query: (localId) => `profilesPictures/${localId}.json`
    })
  }),
});

export const { usePutProfilePictureMutation, useGetProfilePictureQuery } = userApi;