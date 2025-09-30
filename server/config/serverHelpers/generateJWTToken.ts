import jwt from "jsonwebtoken"

const JWTSecretKey = process.env.JWT_SECRET
const JWTExpiresIn = "7d"

export const generateJWT = (payload: object) => {
    return jwt.sign(payload, JWTSecretKey, { expiresIn: JWTExpiresIn });
}