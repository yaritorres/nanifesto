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
  console.log('getting posts...');
  return db.query(`
    SELECT * FROM posts
  `);
}

module.exports = {
  getPosts: getPosts,
};