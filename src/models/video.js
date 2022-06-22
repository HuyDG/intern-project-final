import mongoose from "mongoose"

import Movie from "./movie.js"

const videoSchema = mongoose.Schema(
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
    overview: {
      type: String,
      trim: true,
      required: true,
    },
    url: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

const Video = mongoose.model("videos", videoSchema)

export default Video
