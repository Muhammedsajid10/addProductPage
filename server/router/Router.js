const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authControl');
const protect = require('../middlewere/protect');
const upload = require('../controllers/multerConfig');
const dataUpload = require('../controllers/fileController');

const middleware = [protect]

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/upload').post(middleware, upload.array("files"), dataUpload)


module.exports = router;
