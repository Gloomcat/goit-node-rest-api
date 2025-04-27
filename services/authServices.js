import bcrypt from "bcryptjs";

import User from "../db/models/User.js";

const findUserByEmail = (email) => {
  return User.findOne({
    where: {
      email,
    },
  });
};

const findUserById = (id) => {
  return User.findOne({
    where: {
      id,
    },
  });
};

const findUserByVerificationToken = (verificationToken) => {
  return User.findOne({
    where: {
      verificationToken,
    },
  });
};

const saveUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
};

const updateUserToken = async (user, token) => {
  return user.update({ token: token });
};

const updateUserAvatar = async (user, avatar) => {
  return user.update({ avatar: avatar });
};

const verifyUser = async (user) => {
  return user.update({ verify: true, verificationToken: null });
};

export default {
  findUserByEmail,
  findUserById,
  findUserByVerificationToken,
  saveUser,
  updateUserToken,
  updateUserAvatar,
  verifyUser,
};