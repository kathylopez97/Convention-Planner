const router = require('express').Router();

router.get('/', async (req, res) => {
  res.render('homepage');
});
router.get('/login', async (req, res) => {
  res.render('login');
});
router.get('/createevent', async (req, res) => {
  res.render('createevent');
});
module.exports = router;
