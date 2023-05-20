const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/images/services');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    }
});

const upload = multer({storage: storage});

const storage2 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/prepress");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload2 = multer({ storage: storage2 });

const storage3 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/press");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload3 = multer({ storage: storage3 });

const storage4 = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images/postpress");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const upload4 = multer({ storage: storage4 });


module.exports = {
  upload,
  upload2,
  upload3,
  upload4,
};