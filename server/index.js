const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const db = require('./db');
const PORT = process.env.PORT || 4343;
const app = express();
module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // api routes
  // app.use('/api', require('./api'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // 404 handling middleware
  app.use((req, res, next) => {
    if (path.extname(req.path).length > 0) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // send index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message || 'Sorry, internal server error.');
  });

  // start listening (and create a 'server' object representing server)
  const server = app.listen(PORT, () => console.log(`Check it out on port ${PORT}`));
};

// const syncDb = () => db.sync();

// This evaluates as true when this file is run directly from the command line.
// It will evaluate false when this module is required by another module, for example, if we wanted to require our app in a test spec.
// if (require.main === module) {
//   syncDb()
//     .then(createApp);
// } else {
//   createApp(app);
// }
createApp(app);
