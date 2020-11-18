const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const Activity = require('../models/Activity');

router.get('/', (req, res) => {
    Activity.findAll({})
        .then((activity) => {
            res.render('homepage', { activity });
        })
});

router.get('/create-post', (req, res) => {
    res.render('create-post');
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
                image_url: result.url
            })

            return res.redirect('/')
        })
        .catch((err) => console.log(err))
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

module.exports = router;