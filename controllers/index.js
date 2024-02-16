const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.user('/api', apiRoutes);
// router.use('/events', homeRoutes);
module.exports = router;
