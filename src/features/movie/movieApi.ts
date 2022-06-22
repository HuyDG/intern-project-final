import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Movie, Response } from "../../config/constants"

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/movies",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchMovies: builder.query<Movie[], string>({
      query: () => ({ method: "GET", url: "/" }),
    }),
    fetchMovie: builder.query<Movie, string>({
      query: (id) => ({ method: "GET", url: `/${id}` }),
    }),
    createMovie: builder.query<Response, object | Movie>({
      query: (formData) => ({ method: "POST", url: "/", body: formData }),
    }),
    updateMovie: builder.query<
      Response,
      { id: string; formData: object | Movie }
    >({
      query: ({ id, formData }) => ({
        method: "PATCH",
        url: `/${id}`,
        body: formData,
      }),
    }),
    deleteMovie: builder.query<Response, string>({
      query: (id) => ({ method: "DELETE", url: `/${id}` }),
    }),
  }),
})

export const {
  useFetchMoviesQuery,
  useFetchMovieQuery,
  useCreateMovieQuery,
  useUpdateMovieQuery,
  useDeleteMovieQuery,
} = movieApi
