import { configureStore } from "@reduxjs/toolkit"

import { genreApi } from "../features/genre/genreApi"
import { movieApi } from "../features/movie/movieApi"

export const store = configureStore({
  reducer: {
    [genreApi.reducerPath]: genreApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(genreApi.middleware, movieApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
