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
  const eventData = await Event.findAll({
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  });

  // get just the table information
  const events = eventData.map((e) => {
    return e.get({ plain: true });
  });

  // log the data that was returned
  console.log(events);

  if (!req.session.loggedIn) {
    res.redirect('login')
    return;
  }
  res.render('dashboard', {
    events,
    loggedIn: req.session.loggedIn,
  });
});



module.exports = router;
