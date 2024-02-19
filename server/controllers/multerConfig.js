const multer = require('multer');
const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'video/quicktime'];
const maxSizeMB = 50;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Allowed types: ' + allowedFileTypes.join(', ')), false);
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
        console.log("File size exceeeds limit")
        return cb(new Error(`File size exceeds the allowed limit of ${maxSizeMB}MB`), false);
    }

    cb(null, true)
}

const upload = multer({ storage, fileFilter })

module.exports = upload;