import mongoose from "mongoose"

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
)

const Genre = mongoose.model("genres", genreSchema)

export default Genre
