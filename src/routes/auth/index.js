const express = require('express');
const bodyParser = require('body-parser');
const hash = require('../../lib/hash');
const { sign } = require('../../lib/jwt');
const Database = require('../../lib/database');
const { TOKEN_HEADER } = require('../../config');
const userCollection = new Database('users');

const router = express.Router();
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// define the home page route
router.post('/login', async (req, res) => {
  ['email', 'password'].forEach(key => {
    if (!req.body.hasOwnProperty(key)) {
      res.send({ status: false, message: `${key} is missing!` });
      return;
    }
  });
  const { email, password } = req.body;
  const hashed = hash(password);
  const userCheck = await userCollection.find({ email, password: hashed });
  if (userCheck.length > 0) {
    const user = userCheck[0];
    // Sign the token
    const token = sign({ email });
    res.cookie(TOKEN_HEADER, token);
    res.send({ status: true, token });
    return;
  } else {
    res.send({
      status: false,
      message: 'Email and password do not match!'
    });
    return;
  }
});

router.post('/register', async (req, res) => {
  // Required fields
  ['email', 'password'].forEach(key => {
    if (!req.body.hasOwnProperty(key)) {
      res.send({ status: false, message: `${key} is missing!` });
      return;
    }
  });

  const { email, password } = req.body;
  // check if username exists
  const usersfound = await userCollection.find({
    email
  });
  if (usersfound.length > 0) {
    res.send({
      status: false,
      message: `${email} is already registered!`
    });
    return;
  } else {
    const hashed = hash(password);
    userCollection
      .insert({ email, password: hashed })
      .then(createdUser => {
        res.send({
          status: true,
          email: createdUser.email,
          _id: createdUser._id
        });
        return;
      })
      .catch(err => {
        console.log(err);
        res.send({ status: false, message: 'There has been an error' });
      });
  }
});

module.exports = router;
