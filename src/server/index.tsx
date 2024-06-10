require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const postgres = require('./../database/db.tsx');

app.use(express.json());

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);

app.get(`/`, (req, res) => {
  postgres.getPosts()
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => console.log(err));
});