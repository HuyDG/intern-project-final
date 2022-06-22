import mongoose from "mongoose"

import Movie from "./movie.js"

const trailerSchema = mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Movie,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    key: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

const Trailer = mongoose.model("trailers", trailerSchema)

export default Trailer
