import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
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
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if(contact) {
        console.table(contact);
      } else {
        return null
      }
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.table([newContact]);
      break;

    case "remove":
      const removedContact = await removeContact(id);
      if (removedContact) {
        console.table([removedContact]);
      } else {
        return null
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);