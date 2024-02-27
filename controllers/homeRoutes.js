// Use express and pull in data from Event and User from models //
const router = require('express').Router();
const { Event, User } = require('../models');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  console.log(req.session.loggedIn);
  // Only render if logged in //
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
  });

});

// Route for login. If logged in redirect to homepage //
router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Route for creating an event. Only visible if logged in //
router.get('/createevent', async (req, res) => {

  res.render('createevent', {
    loggedIn: req.session.loggedIn,
  });
});

// Route for dashboard with all created events //
// Find all data from Event model to display on page with handlebars //
// Include User for future functionality if we create a User connection (creator) //
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
