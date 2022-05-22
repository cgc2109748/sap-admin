const multer = require('multer');
const mkdirp = require('mkdirp');
const moment = require('moment');
const path = require('path');

const nowDate = moment().format('YYYY-MM-DD');

const upload = async () => {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      await mkdirp(`./static/upload/${nowDate}`);
      cb(null, `static/upload/${nowDate}`);
    },
    filename: (req, file, cb) => {
      let extname = path.extname(file.originalname);
      let fileName = path.parse(file.originalname).name;
      cb(null, `${fileName}-${Date.now()}${extname}`);
    },
  });
  return multer({
    storage,
    limits: {
      fileSize: 1000000,
      fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
      },
    },
  });
};

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = {
  upload,
};
