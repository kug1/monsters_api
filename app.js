const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

/*
  Requests client make are given status codes.
  Status codes have meanings, i don't know if the one listed below are all of them, but here are some:
  - 2** level means things went well
  - 4** level means you messed something up
  - 5** level means server is broken
*/

const app = express();
app.use(bodyParser.json());
app.use('/', router);

/*
  We are not using the "app" variable (which stores out express app) for request methods anymore.
  Instead of that, we are using what's called "router" 
*/
app.use((err, req, res, next) => {
  res.json(err);
});

module.exports = app;
