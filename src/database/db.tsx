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
}

const newPost = ({ title, body, date }) => {
  return db.query(`
    INSERT INTO posts (username, title, body, date_posted)
      VALUES ('nani', '${title}', '${body}', '${date}')
  `);
}

module.exports = {
  getPosts: getPosts,
  newPost: newPost,
};