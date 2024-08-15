const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

db.connect();

const getPosts = () => {
  return db.query(`
    SELECT * FROM posts
  `);
};

const newPost = ({ title, body }) => {
  return db.query(`
    INSERT INTO posts (username, title, body, date_posted)
      VALUES ('nani', '${title}', '${body}', CURRENT_DATE)
  `);
};

const deletePost = ({ id }) => {
  return db.query(`
    DELETE FROM posts WHERE id = ${id}
  `);
};

const addUser = (username, password) => {
  return db.query(`
    INSERT INTO authenticated (username, password, admin)
      VALUES ('${username}', '${password}', false)
  `);
};

const findUser = (username) => {
  return db.query(`
    SELECT * FROM authenticated WHERE username = '${username}'
  `);
};


module.exports = {
  getPosts: getPosts,
  newPost: newPost,
  deletePost: deletePost,
  addUser: addUser,
  findUser: findUser,
};