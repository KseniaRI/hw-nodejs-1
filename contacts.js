const fs = require('fs').promises;
const path = require('path');
const { uuid } = require('uuidv4');

const filePath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(contactId) {
    const allContacts = await listContacts();
    const contact = allContacts.find(contact => contact.id === contactId);
    if (!contact) {
        return null;
    }
    return contact;
}

async function removeContact(contactId) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === contactId)
    const updatedContacts = allContacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(filePath, JSON.stringify(updatedContacts));
    const deletedContact = allContacts[index];

    return deletedContact;
}

async function addContact(name, email, number) {
    const allContacts = await listContacts();
    const newContact = { name, email, number, id: uuid() };
    allContacts.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(allContacts));
    
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}