require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const postgres = require('./../database/db.tsx');
const bcrypt = require('bcrypt');

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
    console.log('cant post:', err);
  })
});

app.put('/posts', (req, res) => {
  postgres.deletePost(req.body)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log('couldnt delete:', err);
  })
});

app.post('/users', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  try {
    postgres.addUser(req.body.username, hashedPassword)
    .then(() =>
      res.status(201).send('User saved successfully.')
    )
    .catch((error) => {
      console.log(error)
      res.status(500).send('User unable to be saved successfully.')
    })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
});

app.post('/users/login', async (req, res) => {
  const user = req.body.username;
  const password = req.body.password;

  if (user == null) {
    return res.status(400).send('User not found.');
  }
  try {
    postgres.findUser(user)
    .then(async response => {
      if (response.rows[0]) {
        if (await bcrypt.compare(password, response.rows[0].password)) {
          res.status(201).send('User logged in successfully.')
        } else {
          res.status(500).send('Incorrect username or password')
        }
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).send('Something went wrong.')
    })
  } catch (error) {
    console.log(error)
    res.status(500).send()
  }
})