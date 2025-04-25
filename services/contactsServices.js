import Contact from "../db/models/Contact.js";

const listContacts = () => {
  return Contact.findAll();
};

const getContactById = (id) => {
  return Contact.findByPk(id);
};

const removeContact = async (id) => {
  const contact = await getContactById(id);
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

const updateContact = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) {
    return null;
  }

  return contact.update(data, {
    returning: true,
  });
};

const updateStatusContact = async (id, data) => {
  const contact = await getContactById(id);
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
