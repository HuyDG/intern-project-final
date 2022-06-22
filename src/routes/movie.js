import express from "express"
import jwtAuthz from "express-jwt-authz"

import {
  CREATE_MOVIES,
  authzConfig,
  UPDATE_MOVIES,
  DELETE_MOVIES,
} from "../config/constants.js"
import {
  create,
  destroy,
  fetchAll,
  fetchById,
  update,
} from "../controllers/movie.js"
import checkJwt from "../middleware/auth0.js"

const router = express.Router()

router.get("/", fetchAll)
router.get("/:id", fetchById)
router.post("/", checkJwt, jwtAuthz([CREATE_MOVIES], authzConfig), create)
router.patch("/:id", checkJwt, jwtAuthz([UPDATE_MOVIES], authzConfig), update)
router.delete("/:id", checkJwt, jwtAuthz([DELETE_MOVIES], authzConfig), destroy)

export default router
