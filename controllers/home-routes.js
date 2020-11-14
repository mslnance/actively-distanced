const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;
cloudinary.config({ cloud_name: 'actively-distanced', api_key: '459732884598213', api_secret: '69tQZU3yr0mFsxuNe2U2WCDR544' });
const dataURI = require('datauri');
const dURI = new dataURI();
const path = require('path');

router.get('/', (req, res) => {
    res.render('homepage');
});

router.post('/profile', upload.single('photo'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    // let data = dataURI.format(path.extname(req.file.originalname).toString(), req.file.buffer);
    return cloudinary.uploader.upload(req.file.path)
        .then((result) => {
            return res.status(200).json({
                data: result.url
            })
        })
});

module.exports = router;