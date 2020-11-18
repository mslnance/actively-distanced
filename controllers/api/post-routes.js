const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'time',
            'image_url',
            [sequelize.literal('(')]
        ],
        include: [
            {
                mode: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

module.exports = router;
