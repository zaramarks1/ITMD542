const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const Contact = require('./Contact');

const db = new Map();

const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    //const jsonData = fs.readFileSync('data/todos.json');
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach(element => {
      const aContact = new Todo(element[1].id, element[1].firstName, element[2].lastName, element[3].email, element[4].date);
      db.set(aContact.id, aContact);
    });
    console.log(db);
  };

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
  };

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
      contact.id = crypto.randomUUID();
      contact.date = new Date();
      db.set(contact.id, contact);
      saveData();
    },
    deleteById: (uuid) => {
      db.delete(uuid);
      saveData()
    },
    update: (contact) => { 
      contact.date = new Date();
      db.set(contact.id, contact);
      saveData();
    },
  };


loadData();

module.exports = repo;