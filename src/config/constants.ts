export interface Genre {
  _id?: string
  name: string
  description: string
  createdAt?: string
  updatedAt?: string
}

export interface Movie {
  _id?: string
  title: string
  posterImage: string
  bannerImage: string
  genres: string[]
  releaseDate: string
  voteAverage: number
  voteCount: number
  viewCount: number
  status: "Upcoming" | "Ongoing" | "Finished"
  createdAt?: string
  updatedAt?: string
}

export interface Comment {
  _id?: string
  userId: string
  movieId: string
  body: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Response {
  message: string
}

export const genreData: Genre = {
  name: "",
  description: "",
}

export const movieData: Movie = {
  title: "",
  posterImage: "",
  bannerImage: "",
  genres: [],
  releaseDate: "",
  voteAverage: 0,
  voteCount: 0,
  viewCount: 0,
  status: "Upcoming",
}
