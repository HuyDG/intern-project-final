import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Genre, Response } from "../../config/constants"

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/genres",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchGenres: builder.query<Genre[], string>({
      query: () => ({ method: "GET", url: "/" }),
    }),
    fetchGenre: builder.query<Genre, string>({
      query: (id) => ({ method: "GET", url: `/${id}` }),
    }),
    createGenre: builder.query<Response, Genre | object>({
      query: (formData) => ({ method: "POST", url: "/", body: formData }),
    }),
    updateGenre: builder.query<
      Response,
      { id: string; formData: object | Genre }
    >({
      query: ({ id, formData }) => ({
        method: "PATCH",
        url: `/${id}`,
        body: formData,
      }),
    }),
    deleteGenre: builder.query<Response, string>({
      query: (id) => ({ method: "DELETE", url: `/${id}` }),
    }),
  }),
})

export const {
  useFetchGenresQuery,
  useFetchGenreQuery,
  useCreateGenreQuery,
  useUpdateGenreQuery,
  useDeleteGenreQuery,
} = genreApi
