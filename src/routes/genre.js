import express from "express"
import jwtAuthz from "express-jwt-authz"

import {
  CREATE_GENRES,
  authzConfig,
  UPDATE_GENRES,
  DELETE_GENRES,
} from "../config/constants.js"
import {
  create,
  destroy,
  fetchAll,
  fetchById,
  update,
} from "../controllers/genre.js"
import checkJwt from "../middleware/auth0.js"

const router = express.Router()

router.get("/", fetchAll)
router.get("/:id", fetchById)
router.post("/", checkJwt, jwtAuthz([CREATE_GENRES], authzConfig), create)
router.patch("/:id", checkJwt, jwtAuthz([UPDATE_GENRES], authzConfig), update)
router.delete("/:id", checkJwt, jwtAuthz([DELETE_GENRES], authzConfig), destroy)

export default router
