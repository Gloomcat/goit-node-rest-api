import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js"

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

try {
  await Contact.sync({ alter: true });
} catch (_) {
  // Recreate table with potential information loss (only non-production approach)
  await Contact.sync({ force: true });
}

export default Contact;