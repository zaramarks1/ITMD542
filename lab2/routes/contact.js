
var express = require('express');
var router = express.Router();

const contactsRepo = require('../src/contactsFileRepo');

/* GET home page. */
router.get('/', function(req, res, next) {
  const data = contactsRepo.findAll();
  res.render('contacts', { title: 'contacts', contacts : data });
});

module.exports = router;
