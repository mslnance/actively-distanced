const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Activity, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Activity.findAll({
        attributes: [
            'id',
            'title',
            'description',
            'date',
            'time',
            'image_url',
            'link',
            'activity_type'
            [sequelize.literal('(')]
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'activity_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/edit-activity/:id', withAuth, (req, res) => {
    Activity.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbActivityData => {
            if (!dbActivityData) {
                res.status(404).json({ message: 'No activity found with this id' });
                return;
            }
            res.json(dbActivityData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/edit-activity/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Activity.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbActivityData => {
            if (!dbActivityData) {
                res.status(404).json({ message: 'No activity found with this id' });
                return;
            }
            res.json(dbActivityData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;