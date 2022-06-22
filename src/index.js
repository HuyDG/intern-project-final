import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

import genreRoutes from "./routes/genre.js"
import movieRoutes from "./routes/movie.js"
import trailerRoutes from "./routes/trailer.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comment.js"

dotenv.config()

const app = express()

app.use(express.json({ limit: "30mb" }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.get("/", (req, res) => {
  res.send("Movie API")
})

app.use("/genres", genreRoutes)
app.use("/movies", movieRoutes)
app.use("/trailers", trailerRoutes)
app.use("/videos", videoRoutes)
app.use("/comments", commentRoutes)

mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error))

mongoose.set("runValidators", true)
