const contactsRepo = require('../src/contactsFileRepo');
const contactsSQLRepo = require('../src/contactsSQLiteRepo');
const Contact = require('../src/Contact')
const { validationResult } = require('express-validator');

/* GET contacts . */
exports.contacts_list = function(req, res, next) {
    const data = contactsSQLRepo.findAll();
    res.render('contacts', { title: 'Contact List Page', contacts : data });
};

exports.contacts_add_get = function(req, res, next){
    const data = new Date().toDateString()
    res.render('contact_add', { title: data});
};

exports.contacts_add_post = function(req, res, next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render('contact_add', { title: 'Add a contact', msg: result.array() });
    }else{
      const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 
      contactsSQLRepo.create(newContact);
      res.redirect('/contacts');
    }
};

exports.contacts_single = function(req, res, next){
    const data = contactsSQLRepo.findById(req.params.uuid);
    res.render('contact', { title: 'Contact Information', contact : data });
};

exports.contacts_edit_get = function(req, res, next){
    const contact = contactsSQLRepo.findById(req.params.uuid);
    res.render('contact_edit', { title: 'Edit Contact Information', contact : contact });
};

exports.contacts_edit_post = function(req, res, next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render('contact_edit', { title: 'Edit a Contact', msg: result.array() });
    }else{
    const newContact = new Contact(req.params.uuid, req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 
    contactsSQLRepo.update(newContact);
    res.redirect('/contacts');
    }
};

exports.contacts_delete_get = function(req, res, next){
    const contact = contactsSQLRepo.findById(req.params.uuid);
    res.render('contact_delete', { title: 'Are you sure you want to delete the following Contact?', contact : contact });
};

exports.contacts_delete_post = function(req, res, next){
    contactsSQLRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
};
