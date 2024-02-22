const router = require('express').Router();
const { Event, User } = require('../models');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  console.log(req.session.loggedIn);

  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });
  
});

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get('/createevent', async (req, res) => {
  // if(!req.session.loggedIn){
  //   res.redirect('login');
  //   return;
  // }
  res.render('createevent', {
    loggedIn: req.session.loggedIn,
  });
});

router.get('/dashboard', async (req, res) => {
  if(!req.session.loggedIn){
    res.redirect('login')
    return;
  }
  res.render('dashboard', {
    loggedIn: req.session.loggedIn,
  });
});



module.exports = router;
