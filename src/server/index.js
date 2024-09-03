require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const postgres = require('./../database/db.tsx');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT);
console.log(`Listening on port ${process.env.PORT}`);


// GET EXISTING POSTS
app.get(`/posts`, authenticateToken, (req, res) => {
  postgres.getPosts()
  .then(data => {
    res.send(data.rows);
  })
  .catch(err => console.log(err));
});


// ADD NEW POST
app.post('/posts', authenticateToken, (req, res) => {
  postgres.newPost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('cant post:', err);
  })
});


// DELETE POST
app.put('/posts', authenticateToken, (req, res) => {
  postgres.deletePost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('couldnt delete:', err);
  })
});

app.get('/find-user', authenticateToken, (req, res) => {
  postgres.findUser(req.user.name)
  .then(response => {
    res.send({username: response.rows[0].username, admin: response.rows[0].admin})
  })
  .catch(err => {
    console.log(err)
  })
})

function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}
