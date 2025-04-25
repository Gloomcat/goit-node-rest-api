import { where } from "sequelize";
import Contact from "../db/models/Contact.js";

const listContacts = (owner) => {
  return Contact.findAll({
    where: {
      owner,
    },
  });
};

const getContactById = (owner, id) => {
  return Contact.findOne({
    where: {
      id,
      owner,
    },
  });
};

const removeContact = async (owner, id) => {
  const contact = await getContactById(owner, id);
  if (!contact) {
    return null;
  }

  const data = contact.get({ plain: true });

  await contact.destroy();
  return data;
};

const addContact = (data) => {
  return Contact.create(data);
};

const updateContact = async (owner, id, data) => {
  const contact = await getContactById(owner, id);
  if (!contact) {
    return null;
  }

  return contact.update(data, {
    returning: true,
  });
};

const updateStatusContact = async (owner, id, data) => {
  const contact = await getContactById(owner, id);
  if (!contact) {
    return null;
  }

  const { favorite } = data;
  return contact.update(
    {
      favorite: favorite,
    },
    {
      returning: true,
    }
  );
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
