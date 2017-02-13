const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/muber');
}

// order here is important
app.use(bodyParser.json());

routes(app);

// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

module.exports = app;
