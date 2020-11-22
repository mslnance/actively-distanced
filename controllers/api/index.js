const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const activityRoutes = require('./activity-routes.js');
// const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/activities', activityRoutes);
// router.use('/comments', commentRoutes);

module.exports = router;
