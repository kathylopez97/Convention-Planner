const router = require('express').Router();
const {Event, User} = require('../models');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/createevent', async (req, res) => {
  // if(!req.session.loggedIn){
  //   res.redirect('login');
  //   return;
  // }
  res.render('createevent');
});

router.get('/dashboard', async (req, res) => {
  // if(!req.session.loggedIn){
  //   res.redirect('login')
  //   return;
  // }
  res.render('dashboard');
});



module.exports = router;
