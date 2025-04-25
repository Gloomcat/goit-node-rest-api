import contactsService from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts(req.user.id);

  res.json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(req.user.id, id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(req.user.id, id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const createContact = async (req, res) => {
  const result = await contactsService.addContact({
    ...req.body,
    owner: req.user.id,
  });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(req.user.id, id, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateStatusContact(
    req.user.id,
    id,
    req.body
  );
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};