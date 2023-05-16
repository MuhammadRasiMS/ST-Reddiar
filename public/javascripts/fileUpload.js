const multer = require('multer');

const storage = multer.diskStorage({
    destination: (callback) => {
        callback(null, 'public/images')
    },
    filename: (file, callback) => {
        callback(null, file.originalname + '_' + Date.now())
    }
});

const upload = multer({storage: storage});

module.exports = {
    upload
};