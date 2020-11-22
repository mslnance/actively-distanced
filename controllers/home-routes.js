const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const Activity = require('../models/Activity');

// router.get('/', (req, res) => {
//     Activity.findAll({})
//         .then((activity) => {
//             res.render('homepage', { activity });

// const Post = require('../models/Post');
const User = require('../models/User');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Activity.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then((activities) => {
            console.log(req.session.loggedIn);
            // console.log(posts[3].user.dataValues.username);
            // if (!posts.length) {
            //     res.render('login');
            // }
            // else {
            res.render('homepage', {
                activities,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
            // }
        })
});

router.get('/homepage', (req, res) => {
    Activity.findAll({
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then((activities) => {
            console.log(req.session.loggedIn);
            // console.log(posts[3].user.dataValues.username);
            // if (!posts.length) {
            //     res.render('login');
            // }
            // else {
            res.render('homepage', {
                activities,
                loggedIn: true // tell front end that you're logged in
            });
            // }
        })
});

router.get('/create-activity', withAuth, (req, res) => {
    res.render('create-activity', {
        loggedIn: req.session.loggedIn
    });
});

router.post('/profile', upload.single('photo'), function (req, res, next) {
    console.log(req.body);
    return cloudinary.uploader.upload(req.file.path)
        .then((result) => {
            Activity.create({
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
    Activity.findAll({
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
        .then(activities => {
            res.render('my-activities', {
                activities,
                loggedIn: req.session.loggedIn
            });
        })

});

module.exports = router;