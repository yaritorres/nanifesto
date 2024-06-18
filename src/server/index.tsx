require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const postgres = require('./../database/db.tsx');

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);

app.get(`/posts`, (req, res) => {
  postgres.getPosts()
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => console.log(err));
});

app.post('/posts', (req, res) => {
  postgres.newPost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('ruh roh cant post:', err);
  })
})