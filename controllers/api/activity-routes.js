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
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time
            // location: req.body.location,
            // link: req.body.link,
            // group_size: req.body.group_size,
            // activity_type: req.body.activity_type,
            // image_url: result.url,
            // user_id: req.session.user_id
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