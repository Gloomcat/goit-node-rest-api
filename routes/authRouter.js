import express from "express";

import validateBody from "../helpers/validateBody.js";
import validateUser from "../helpers/validateUser.js";
import upload from "../helpers/upload.js";
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
authRouter.get("/current", validateUser, authController.current);
authRouter.patch(
  "/avatars",
  validateUser,
  upload.single("avatar"),
  authController.avatars
);
authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post(
  "/verify",
  validateBody(authSchema.authVerifySchema),
  authController.reverify
);

export default authRouter;