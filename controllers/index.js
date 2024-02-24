const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Create routes for homepage and api data. Utilize routes defined and pulled in above //
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
