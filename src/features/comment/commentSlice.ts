import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/comments",
    prepareHeaders: (headers) => {
      headers.set(
        "authorization",
        `Bearer ${localStorage.getItem("access_token")}`
      )

      return headers
    },
  }),
  endpoints: (builder) => ({
    fetchComments: builder.query({
      query: () => ({ method: "GET", url: "/" }),
    }),
  }),
})
