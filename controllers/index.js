<<<<<<< HEAD
var test = '';
=======
const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
>>>>>>> 11b9179632f8dd07f7d210c1b2ecc99788faf288
