const express = require('express');
const apiRoutes = require('./api');

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);


app.use((req, res) => {
  res.status(404).send('Wrong route!');
});

module.exports = app;
