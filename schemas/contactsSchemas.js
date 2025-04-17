import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name must be no more than 30 characters long.",
    "any.required": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid format (e.g., name.second@sub.dom).",
    "any.required": "Email is required.",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .min(7)
    .max(20)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid format (e.g., +1234567890 or (123) 456-7890).",
      "string.min": "Phone number must be at least 7 characters long.",
      "string.max": "Phone number must be no more than 20 characters long.",
      "any.required": "Phone number is required.",
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(30).messages({
    "string.min": "Name must be at least 2 characters long.",
    "string.max": "Name must be no more than 30 characters long.",
  }),
  email: Joi.string().email().messages({
    "string.email": "Email must be a valid format (e.g., name.second@sub.dom).",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .min(7)
    .max(20)
    .messages({
      "string.pattern.base":
        "Phone number must be a valid format (e.g., +1234567890 or (123) 456-7890).",
      "string.min": "Phone number must be at least 7 characters long.",
      "string.max": "Phone number must be no more than 20 characters long.",
    }),
});