const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const position = contacts.indexOf(({ id }) => id === "AeHIrLTr6JkxGE6SN-0Rw");
    const remove = contacts.splice(position, 1)
    // await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(contacts);
    return remove;
  } catch {
    console.log(error.message);
  }
};

removeContact()

const addContact = (name, email, phone) => {
  // ...twój kod
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
