import fs from "node:fs/promises";
import { nanoid } from "nanoid";
import * as path from "path";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const position = contacts.findIndex((contact) => contact.id === contactId);
    if (position === -1) {
      console.log(`No contact with id: ${contactId}`);
      return false;
    }
    return contacts[position];
  } catch (error) {
    console.log(error.message);
  }
};

export const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const position = contacts.findIndex((contact) => contact.id === contactId);
    if (position === -1) {
      console.log(`No contact with id: ${contactId}`);
      return false;
    }
    const removedContact = contacts.splice(position, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

export const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};
