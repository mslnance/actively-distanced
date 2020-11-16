const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const Post = require('../models/Post');

router.get('/', (req, res) => {
    Post.findAll({})
        .then((posts) => {
            res.render('homepage', { posts });
        })
});

router.get('/events', (req, res) => {
    res.render('events');
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
                image_url: result.url
            })

            return res.redirect('/')
        })
        .catch((err) => console.log(err))
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

module.exports = router;