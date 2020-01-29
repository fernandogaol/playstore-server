const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const apps = require('./apps-data.js');
const app = express();

app.use(morgan('common'));
app.use(cors());

app.get('/apps', (req, res) => {
  const { search = '', sort } = req.query;
  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res.status(400).send('Sort must be one of app or rating');
    }
  }
  let result = apps.filter(app =>
    app.Genres.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    result.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    });
  }
  res.json(result);
});

module.exports = app;
