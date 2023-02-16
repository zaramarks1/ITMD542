const contactsRepo = require('../src/contactsFileRepo');
const Contact = require('../src/Contact')
const { validationResult } = require('express-validator');

/* GET contacts . */
exports.contacts_list = function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts', { title: 'contacts', contacts : data });
};

exports.contacts_add_get = function(req, res, next){
    res.render('contact_add', { title: 'Add a contact' });
};

exports.contacts_add_post = function(req, res, next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render('contact_add', { title: 'Add a contact', msg: result.array() });
    }else{
      const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 
      contactsRepo.create(newContact);
      res.redirect('/contacts');
    }
};

exports.contacts_single = function(req, res, next){
    const data = contactsRepo.findById(req.params.uuid);
    res.render('contact', { title: 'contact', contact : data });
};

exports.contacts_edit_get = function(req, res, next){
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contact_edit', { title: 'contact', contact : contact });
};

exports.contacts_edit_post = function(req, res, next){
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render('contact_edit', { title: 'Edit a contact', msg: result.array() });
    }else{
    const newContact = new Contact(req.params.uuid, req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 
    contactsRepo.update(newContact);
    res.redirect('/contacts');
    }
};

exports.contacts_delete_get = function(req, res, next){
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contact_delete', { title: 'contact', contact : contact });
};

exports.contacts_delete_post = function(req, res, next){
    contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
};
