// imports and cloudinary
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const { Activity, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get route for homepage
router.get('/', (req, res) => {
    Activity.findAll({
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
        .then((activities) => {

            res.render('homepage', {
                activities,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// loads this route when the user first logs in to set loggedIn = true
router.get('/homepage', (req, res) => {
    Activity.findAll({
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
        .then((activities) => {
            res.render('homepage', {
                activities,
                loggedIn: true // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get route for creating an activity
router.get('/create-activity', withAuth, (req, res) => {
    res.render('create-activity', {
        loggedIn: req.session.loggedIn
    });
});

// post route for an activity. this uses cloudinary and multer to store the image as a URL in cloudinary
router.post('/profile', upload.single('image_url'), function (req, res, next) {
    return cloudinary.uploader.upload(req.file.path)
        .then((result) => {
            Activity.create({
                title: req.body.title,
                description: req.body.description,
                date: req.body.date,
                time: req.body.time,
                location: req.body.location,
                link: req.body.link,
                group_size: req.body.group_size,
                activity_type: req.body.activity_type,
                image_url: result.url,
                user_id: req.session.user_id
            })

            return res.redirect('/')
        })
        .catch((err) => console.log(err))
});

// get route for login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// get route for logout. updates loggedIn to false to update components
router.get('/logout', withAuth, (req, res) => {
    req.session.loggedIn = false;
    res.render('login');
});

// get route for sign up
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// get route for my activities
router.get('/my-activities', withAuth, (req, res) => {
    Activity.findAll({
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
                attributes: ['id', 'comment_text', 'activity_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then((activities) => {
            res.render('my-activities', {
                activities,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// edit each activity by their id
router.get('/edit-activity/:id', withAuth, (req, res) => {
    res.render('edit-activity', {
        loggedIn: req.session.loggedIn
    });
});

//sort by outdoor activity 
router.get('/outdoor', (req, res) => {
    Activity.findAll({
        where: {
            activity_type: "Outdoor"
        },
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
        .then((activities) => {
            res.render('homepage', {
                activities,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//sort by virtual activity 
router.get('/virtual', (req, res) => {
    Activity.findAll({
        where: {
            Activity_type: "Virtual"
        },
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
        .then((activities) => {

            res.render('homepage', {
                activities,
                loggedIn: req.session.loggedIn // tell front end that you're logged in
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
