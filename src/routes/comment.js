import express from "express"
import {
  create,
  destroy,
  fetchById,
  fetchByMovieId,
  fetchByUserId,
  update,
} from "../controllers/comment.js"

const router = express.Router()

router.get("/:id", fetchById)
router.get("/:userId", fetchByUserId)
router.get("/:movieId", fetchByMovieId)
router.post("/", create)
router.patch("/:id", update)
router.delete("/:id", destroy)

export default router
