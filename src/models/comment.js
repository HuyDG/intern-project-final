import mongoose from "mongoose"

import Movie from "./movie.js"

const commentSchema = mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Movie,
      required: true,
    },
    userId: {
      type: String,
      trim: true,
      required: true,
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

const Comment = mongoose.model("comments", commentSchema)

export default Comment
