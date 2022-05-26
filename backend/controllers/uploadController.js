const multer = require('multer');

const upload = multer({
  dest: 'public/uploads',
}).single('file');

module.exports = {
  upload,
};
