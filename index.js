const contactsOperations = require('./contacts');
const argv = require('yargs').argv;


async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
          const contacts = await contactsOperations.listContacts();
          console.log(contacts);
      break;

    case 'get':
          const contact = await contactsOperations.getContactById(id);
          if(!contact){
                throw new Error(`Contact with id=${id} not found`);
            }
            console.log(contact);
      break;

    case 'add':
          const newContact = await contactsOperations.addContact(name, email, phone);
          console.log(newContact);
      break;

    case 'remove':
          const removedContact = await contactsOperations.removeContact(id);
          console.log(removedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
// invokeAction({ action: "list"})
// invokeAction({ action: "get", id: "1" })
// invokeAction({ action: "remove", id: "1"})
// invokeAction({ action: "add", name: "cat", email: "cat@test.com", phone: "88-99-99"})

