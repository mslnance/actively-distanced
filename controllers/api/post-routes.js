const router = require('express').Router();
const sequelize = require('../../config/connection');
const Activity = require('../../models/Activity');

router.get('/create-post', (req, res) => {
    Activity.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'time',
            'image_url',
            [sequelize.literal('(')]
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
