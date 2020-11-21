const router = require('express').Router();
const sequelize = require('../../config/connection');
<<<<<<< HEAD
const { Post, User } = require('../../models');
=======
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
>>>>>>> develop

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
                model: User,
<<<<<<< HEAD
                attributes: ['username']
=======
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
>>>>>>> develop
            }
        ]
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

<<<<<<< HEAD
module.exports = router;
=======
router.put('/edit-activity/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
>>>>>>> develop
