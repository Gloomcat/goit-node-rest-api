import Joi from "joi";

const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "email must be a valid format (e.g., name.second@sub.dom).",
    "any.required": "email is required.",
  }),
  password: Joi.string().required().min(6).messages({
    "string.min": "password must be at least 6 characters long.",
    "any.required": "password is required.",
  }),
});

export default {
  authSchema,
};