const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
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
            console.log(posts);
            // const comments = posts.map(comment => comment.get({ plain: true }));
            // console.log('comments: ' + comments);
            // const comments = post.comments.map(comment => comment.get({ plain: true }));

            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        // .then(dbPostData => {
        //     console.log('-------------');
        //     console.log('db post data' + dbPostData);
        //     const posts = dbPostData.map(post => post.get({ plain: true }));

        //     res.render('homepage', {
        //         posts,
        //         loggedIn: req.session.loggedIn
        //     });
        // })
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
                attributes: ['username']
            }
        ]
    })
        .then((posts) => {
            console.log(req.session.loggedIn);

            res.render('homepage', {
                posts,
                loggedIn: true // tell front end that you're logged in
            });
        })
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
                attributes: ['username']
            }
        ]
    })
        .then(posts => {
            res.render('my-activities', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })

});

module.exports = router;