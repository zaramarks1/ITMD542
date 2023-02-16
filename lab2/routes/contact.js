
var express = require('express');
var router = express.Router();

const contactRepo = require('../src/contactsFileRepo');
const Contact = require('../src/Contact')
const { body } = require('express-validator');
const { validationResult } = require('express-validator');


/* GET home page. */
router.get('/', function(req, res, next) {
  const data = contactRepo.findAll();
  res.render('contacts', { title: 'contacts', contacts : data });
});

/* GET Contact page  */
router.get('/add', function(req, res, next) {
  res.render('contact_add', { title: 'Add a contact' });
});

/* POST create Contact. */
router.post('/add',  
body('firstName').trim().notEmpty().withMessage('First name can not be empty!'), 
body('email').trim().notEmpty().withMessage('Email can not be empty!')
  .isEmail().withMessage('Email must be a valid email address!'), 
  function(req, res, next) {

    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.render('contact_add', { title: 'Add a contact', msg: result.array() });
    }else{
      const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 
      contactRepo.create(newContact);
      res.redirect('/contact');
    }
});

/* GET single contact. */
router.get('/:uuid', function(req, res, next) {
  const data = contactRepo.findById(req.params.uuid);
  res.render('contact', { title: 'contact', contact : data });
});

/* GET edit page  */
router.get('/:uuid/edit', function(req, res, next){
  const contact = contactRepo.findById(req.params.uuid);
  res.render('contact_edit', { title: 'contact', contact : contact });
});

/* POST edit Contact */
router.post('/:uuid/edit', function(req, res, next) {

  //const contact = contactRepo.findById(req.params.uuid);

  const newContact = new Contact(req.params.uuid, req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 

  contactRepo.update(newContact);
  res.redirect('/contact');
});

/* Get delete contact page */
router.get('/:uuid/delete', function(req, res, next){
  const contact = contactRepo.findById(req.params.uuid);
  res.render('contact_delete', { title: 'contact', contact : contact });
});

/* POST delete Contact */
router.post('/:uuid/delete', function(req, res, next) {

  //const contact = contactRepo.findById(req.params.uuid);

  contactRepo.deleteById(req.params.uuid);
  res.redirect('/contact');
});




module.exports = router;
