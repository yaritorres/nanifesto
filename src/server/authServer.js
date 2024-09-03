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

app.listen(4000);
console.log(`Listening on port 4000`);

app.post('/users/create', async (req, res) => {
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
  const username = req.body.username;
  const user = { name: username };
  const password = req.body.password;

  if (username == null) {
    return res.status(400).send('User not found.');
  }
  try {
    postgres.findUser(username)
    .then(async response => {
      if (response.rows[0]) {
        if (await bcrypt.compare(password, response.rows[0].password)) {
          const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1hr'});
          res.json({ accessToken: accessToken });
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
});