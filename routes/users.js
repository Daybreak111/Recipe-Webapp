var express = require('express');
var router = express.Router();
var db =require('../database');

router.get('/form', function(req, res, next) {
  res.render('users'); 
});

router.post('/create', async function(req, res, next) {
  
  // store all the user input data
 
  // insert user data into users table
 res.redirect('/users/form');  // redirect to user form page after inserting the data
}); 


module.exports = router;
