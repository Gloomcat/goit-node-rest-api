import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

const createToken = payload => jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

const validateToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
};

export default {
  createToken,
  validateToken,
};