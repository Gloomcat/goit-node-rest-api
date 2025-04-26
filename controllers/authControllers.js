import fs from "node:fs";
import path from "node:path";

import gravatar from "gravatar";

import authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import jwt_helpers from "../helpers/jwt.js";
import compareHash from "../helpers/compareHash.js";

const avatarsDir = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, { s: 200, d: "retro" }, true);
  const newUser = await authService.saveUser({ ...req.body, avatarURL });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.findUserByEmail(email);
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await compareHash(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user.id,
  };

  const token = jwt_helpers.createToken(payload);
  await authService.updateUserToken(user, token);

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const logout = async (req, res) => {
  await authService.updateUserToken(req.user, "");

  res.status(204).json();
};

const current = async (req, res) => {
  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

const avatars = async (req, res) => {
  let avatar = null;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(avatarsDir, filename);
    await fs.rename(oldPath, newPath, (error) => {
      if (error) {
        throw error;
      }
    });
    avatar = `/avatars/${filename}`;
  }

  await authService.updateUserAvatar(req.user, avatar);

  res.json({
    avatarURL: avatar,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  avatars: ctrlWrapper(avatars),
};
