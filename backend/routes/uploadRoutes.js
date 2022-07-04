const express = require('express');
const router = express.Router();
const { upload } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const fs = require('fs');
const moment = require('moment');

const fileUrl = process.env.FILE_URL;
const nowDate = moment().format('YYYYMMDDHHmmss');

router.post('/', upload, (req, res) => {
  if (req.file.length === 0) {
    res.render('error', { message: '上传文件不能为空！' });
    return;
  } else {
    const file = req.file;
    const fileInfo = {};
    console.log('file: ', file);
    fs.renameSync(`./public/uploads/${file.filename}`, `./public/uploads/${nowDate}_${file.originalname}`);
    fileInfo.mimetype = file.mimetype;
    fileInfo.originalname = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.path;

    res.set({
      'content-type': 'application/json; charset=utf-8',
    });

    // res.end('上传成功!');
    console.log('fileUrl:', fileUrl);
    res.status(200).json({
      code: 200,
      url: `https://zcgl.ibr-x.com/uploads/${nowDate}_${file.originalname}`,
      // url: `${fileUrl}/uploads/${nowDate}_${file.originalname}`,
      message: '上传成功！',
    });
  }
});
// router.post('/', upload.single('myImage'))

module.exports = router;
