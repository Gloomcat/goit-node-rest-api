import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const createToken = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

export default createToken;