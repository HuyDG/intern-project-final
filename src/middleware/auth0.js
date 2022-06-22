import dotenv from "dotenv"
import { expressjwt } from "express-jwt"
import jwks from "jwks-rsa"

dotenv.config()

const checkJwt = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUDIENCE,
  issuer: `https://${process.env.DOMAIN}/`,
  algorithms: ["RS256"],
})

export default checkJwt
