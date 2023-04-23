var express = require('express');
var router = express.Router();

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/login');
});

const users = {};

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;

  if (users[username]) {
    res.status(400).json({ message: 'Username already exists' });
  } else {
    users[username] = { password };
    console.log('Registered:', { username, password });
    res.status(200).json({ message: 'User registered successfully' });
    res.redirect('/')
    return
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users[username];

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  } else if (user.password !== password) {
    res.status(401).json({ message: 'Incorrect password' });
  } else {
    console.log('Logged in:', { username, password });
    res.status(200).json({ message: 'User logged in successfully' });
    res.redirect('/')
    return
  }
});

module.exports = router;
