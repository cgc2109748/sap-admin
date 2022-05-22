const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const ejs = require('ejs');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/productLogs', require('./routes/productLogRoutes'));
app.use('/api/productGroups', require('./routes/productGroupsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/upload', require('./routes/uploadRoutes'));

app.set('view engine', 'ejs');
// Public Folder
app.use(express.static('./public'));
app.get('/', (req, res) => res.render('index'));

const { upload } = require('./controllers/uploadController');

app.post('/api/upload', (req, res) => {
  console.log('file ', req.file);
  console.log('render', res.render);
  upload(req, res, (err) => {
    if (err) {
      res.render('index', {
        msg: err,
      });
    } else {
      if (req.file == undefined) {
        res.render('index', {
          msg: 'Error: No File Selected!',
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`,
        });
      }
    }
  });
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
