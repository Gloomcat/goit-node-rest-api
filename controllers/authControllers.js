import authService from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import jwt_helpers from "../helpers/jwt.js";
import compareHash from "../helpers/compareHash.js";

const register = async (req, res) => {
  const { email } = req.body;
  const user = await authService.findUserByEmail(email);
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await authService.saveUser(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
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

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
};