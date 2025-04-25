import express from "express";
import contactController from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import contactSchema from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactController.getAllContacts);

contactsRouter.get("/:id", contactController.getOneContact);

contactsRouter.delete("/:id", contactController.deleteContact);

contactsRouter.post(
  "/",
  validateBody(contactSchema.createContactSchema),
  contactController.createContact
);

contactsRouter.put(
  "/:id",
  validateBody(contactSchema.updateContactSchema),
  contactController.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  validateBody(contactSchema.updateStatusContactSchema),
  contactController.updateStatusContact
);

export default contactsRouter;
