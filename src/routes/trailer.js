import express from "express"
import jwtAuthz from "express-jwt-authz"

import {
  CREATE_TRAILER,
  UPDATE_TRAILER,
  DELETE_TRAILER,
  authzConfig,
} from "../config/constants.js"
import {
  fetchAll,
  fetchById,
  create,
  update,
  destroy,
} from "../controllers/trailer.js"
import checkJwt from "../middleware/auth0.js"

const router = express.Router()

router.get("/", fetchAll)
router.get("/:id", fetchById)
router.post("/", checkJwt, jwtAuthz([CREATE_TRAILER], authzConfig), create)
router.patch("/:id", checkJwt, jwtAuthz([UPDATE_TRAILER], authzConfig), update)
router.delete(
  "/:id",
  checkJwt,
  jwtAuthz([DELETE_TRAILER], authzConfig),
  destroy
)

export default router
