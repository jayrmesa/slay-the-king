var express = require('express');
const { resource } = require('../app');
var router = express.Router();

module.exports = (db) => {
  const users = {};

  router.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log('req.body', req.body)

    const command = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
    const values = [username, password]
    db.query(command, values)
      .then(data => {
        res.status(200).json({ message: 'User registered successfully' });
      })
      .catch(error => {
        res.status(500).json({ message: 'Username already exists' });
      })
  });

  router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const command = `SELECT * FROM users WHERE username = $1`
    const value = [username]



    db.query(command, value)
      .then(result => {
        const user = result.rows[0]
        if (!user) {
          res.status(404).json({ message: 'User not found' });
        } else if (user.password !== Number(password)) {
          res.status(401).json({ message: 'Incorrect password' });
        } else {
          res.status(200).json({ message: 'User logged in successfully' });
        }
      })
      .catch(error => {
        console.log('err', error)
        res.status(500).json({ message: 'server error' });
      })
  });
  return router;
};

