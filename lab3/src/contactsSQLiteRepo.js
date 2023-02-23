const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const Contact = require('./Contact');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, "
    +"firstName TEXT, lastName TEXT, email TEXT, notes TEXT, date TEXT)");

createStmt.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
          const aContact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes,new Date(row.date).toString());
          contacts.push(aContact);
        });
        return contacts;
      },
  findById: (uuid) => {
    const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
    const row = stmt.get(uuid);
    return  new Contact(row.id, row.firstName, row.lastName, row.email, row.notes,new Date(row.date));
  },
  create: (contact) => {
    const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes, date) VALUES (?, ?, ?, ?, ? )");
    const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes, new Date().toString());
    console.log(`Contact created with id: ${info.lastInsertRowid}`);
  },
  deleteById: (uuid) => {
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    const info = stmt.run(uuid);
    console.log(`rows affected: ${info.changes}`);
  },
  update: (contact) => { 
    const stmt = db.prepare("UPDATE contacts SET firstName = ? , lastName = ? , email = ? , notes = ? , date = ?  WHERE id = ?");
    const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes, new Date().toString(), contact.id);
    console.log(`rows affected: ${info.changes}`);
  },
};

module.exports = repo;