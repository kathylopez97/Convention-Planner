const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
// router.use('/events', homeRoutes);
module.exports = router;
