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

const saveUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
};

const updateUserToken = async (email, token) => {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  return user.update({ token: token });
};

export default {
  findUserByEmail,
  findUserById,
  saveUser,
  updateUserToken,
};