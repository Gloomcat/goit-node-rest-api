import authService from "../services/authServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const register = async (req, res) => {
    const { email } = req.body;
    const user = await authService.findUser(email);
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const newUser = await authService.saveUser(req.body);

    res.status(201).json({
        email: newUser.email,
    })
}

export default {
    register: ctrlWrapper(register),
}