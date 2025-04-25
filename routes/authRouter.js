import express from "express";

import validateBody from "../helpers/validateBody.js";
import validateUser from "../helpers/validateUser.js";
import authSchema from "../schemas/authSchemas.js";
import authController from "../controllers/authControllers.js";

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
authRouter.post("/logout", validateUser, authController.logout);

export default authRouter;