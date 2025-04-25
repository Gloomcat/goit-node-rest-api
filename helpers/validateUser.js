import HttpError from "./HttpError.js";

import authService from "../services/authServices.js";
import jwt_helpers from "./jwt.js"

const validateUser = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    return next(HttpError(401, "Not authorized"));
  }

  const payload = jwt_helpers.validateToken(token);
  if (!payload) {
    return next(HttpError(401, "Not authorized"));
  }

  const user = await authService.findUserById(payload.id);
  if (!user || user.token !== token) {
    return next(HttpError(401, "Not authorized"));
  }

  req.user = user;
  next();
};

export default validateUser;
