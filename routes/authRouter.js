import express from "express";

import validateBody from "../helpers/validateBody.js";
import authSchema from "../schemas/authSchemas.js";
import authController from "../controllers/authControllers.js"

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(authSchema.authSchema),
  authController.register
);
authRouter.post(
  "/login",
  validateBody(authSchema.authSchema),
  authController.login
);

export default authRouter;