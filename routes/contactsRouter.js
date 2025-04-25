import express from "express";
import contactController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", contactController.getOneContact);

contactsRouter.delete("/:id", contactController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contactController.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema),
  contactController.updateContact
);

export default contactsRouter;
