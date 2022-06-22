import mongoose from "mongoose"

import Genre from "./genre.js"

const movieSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    posterImage: {
      type: String,
      trim: true,
      required: true,
    },
    bannerImage: {
      type: String,
      trim: true,
      required: true,
    },
    genres: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Genre,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    voteAverage: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    voteCount: {
      type: Number,
      min: 0,
      required: true,
    },
    viewCount: {
      type: Number,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Finished"],
      required: true,
    },
  },
  { timestamps: true }
)

const Movie = mongoose.model("movies", movieSchema)

export default Movie
