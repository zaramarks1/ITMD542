
var express = require('express');
var router = express.Router();

const contactsRepo = require('../src/contactsFileRepo');

const Contact = require('../src/Contact')

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'contacts', contacts : data });
});

/* GET Contact page  */
router.get('/add', function(req, res, next) {
  res.render('contact_add', { title: 'Add a contact' });
});

/* POST create Contact. */
router.post('/add', function(req, res, next) {

    const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, ''); 

    contactsRepo.create(newContact);
    res.redirect('/contact');
});


module.exports = router;
