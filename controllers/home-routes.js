const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
<<<<<<< HEAD
const Post = require('../models/Post');
const User = require('../models/User');
=======
const { Post, User, Comment } = require('../models');
>>>>>>> develop
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
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
        .then((posts) => {
<<<<<<< HEAD
            console.log(req.session.loggedIn);
            // console.log(posts[3].user.dataValues.username);
            // if (!posts.length) {
            //     res.render('login');
            // }
            // else {
=======
            // console.log(posts);

>>>>>>> develop
            res.render('homepage', {
                posts,
                //这里看起来少了 dataValues
                loggedIn: req.session.loggedIn // tell front end that you're logged in

            });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/homepage', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((posts) => {
            // console.log(posts);

            res.render('homepage', {
                posts,
                loggedIn: true // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/outdoor', (req, res) => {
    Post.findAll({
        where: {
            tag: "outdoor"
        }, 
        include: 
        [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((posts) => {
            // console.log(posts);

            res.render('homepage', {
                posts,
                loggedIn: true // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/virtual', (req, res) => {
    Post.findAll({
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((posts) => {
<<<<<<< HEAD
            console.log(req.session.loggedIn);
            // console.log(posts[3].user.dataValues.username);
            // if (!posts.length) {
            //     res.render('login');
            // }
            // else {
=======
            // console.log(posts);

>>>>>>> develop
            res.render('homepage', {
                posts,
                loggedIn: true // tell front end that you're logged in
            });
            // }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/create-post', withAuth, (req, res) => {
    res.render('create-post', {
        loggedIn: req.session.loggedIn
    });
});

router.post('/profile', upload.single('photo'), function (req, res, next) {
    console.log(req.body);
    return cloudinary.uploader.upload(req.file.path)
        .then((result) => {
            Post.create({
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                time: req.body.time,
                image_url: result.url,
                user_id: req.session.user_id
            })

            return res.redirect('/')
        })
        .catch((err) => console.log(err))
});

router.get('/login', (req, res) => {
    console.log("hello");
    if (req.session.loggedIn) {
        // res.render('homepage', { loggedIn: req.session.loggedIn });
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/logout', withAuth, (req, res) => {
    req.session.loggedIn = false;
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

router.get('/my-activities', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username', 'id']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((posts) => {
            // console.log(posts);

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

<<<<<<< HEAD
module.exports = router;
=======
router.get('/edit-activity/:id', withAuth, (req, res) => {
    res.render('edit-activity', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;
>>>>>>> develop
