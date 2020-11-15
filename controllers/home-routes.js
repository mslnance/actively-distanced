const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const dURI = new dataURI();
const path = require('path');
const Post = require('../models/Post');

router.get('/', (req, res) => {
    res.render('homepage');
});

router.get('/events', (req, res) => {
    Post.findAll({})
        .then((posts) => {
            console.log(posts[0].dataValues.title);
            res.render('events', { posts });
        })
});

router.post('/profile', upload.single('photo'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // let data = dataURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
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

            // return res.status(200).json({
            //     data: result.url
            // })
            return res.redirect('/events')
        })
        .catch((err) => console.log(err))
});

module.exports = router;