import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js"

const User = sequelize.define("user", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
});

try {
    await User.sync({ alter: true });
} catch (_) {
    // Recreate table with potential information loss (only non-production approach)
    await User.sync({ force: true });
}

export default User;
