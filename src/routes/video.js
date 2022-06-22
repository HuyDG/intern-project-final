import express from "express"
import jwtAuthz from "express-jwt-authz"

import {
  CREATE_VIDEO,
  UPDATE_VIDEO,
  DELETE_VIDEO,
  authzConfig,
} from "../config/constants.js"
import {
  fetchAll,
  fetchById,
  create,
  update,
  destroy,
} from "../controllers/video.js"
import checkJwt from "../middleware/auth0.js"

const router = express.Router()

router.get("/", fetchAll)
router.get("/:id", fetchById)
router.post("/", checkJwt, jwtAuthz([CREATE_VIDEO], authzConfig), create)
router.patch("/:id", checkJwt, jwtAuthz([UPDATE_VIDEO], authzConfig), update)
router.delete("/:id", checkJwt, jwtAuthz([DELETE_VIDEO], authzConfig), destroy)

export default router
