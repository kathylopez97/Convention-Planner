const router = require('express').Router();
const userRoutes = require('./user-routes');
const eventRoutes = require('./event-routes');

// Create user and event routes with user/event data //
router.use('/user', userRoutes);
router.use('/event', eventRoutes);

module.exports = router;