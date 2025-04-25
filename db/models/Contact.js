import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js"

const Contact = sequelize.define(
    'contact', {
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
});


// Creation of missing table and/or try soft fix of columns if they are incorrect
Contact.sync({ alter: true });

export default Contact;