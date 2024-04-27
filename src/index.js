import { program } from "commander";
import colors from "colors";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.log(colors.bgGreen("Contacts list:"));
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(colors.bgGreen("Contact:"));
      console.table(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(colors.bgGreen("Contact added!"));
      console.table(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(colors.bgRed("Contact deleted!"));
      console.table(deletedContact);
      break;

    default:
      console.warn(colors.bgRed("Unknown action type!"));
  }
}

invokeAction(options);
