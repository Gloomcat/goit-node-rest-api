import bcrypt from "bcryptjs";

import User from "../db/models/User.js";

const findUser = (email) => {
  return User.findOne({
    where: {
      email,
    },
  });
};

const saveUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hashPassword });
};

const updateUserToken = async (email, token) => {
  const user = await findUser(email);
  if (!user) {
    return null;
  }

  return user.update({ token: token });
};

export default {
  findUser,
  saveUser,
  updateUserToken,
};