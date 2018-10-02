const express = require('express');
const router = express.Router();
const { verify, sign } = require('./../../lib/jwt');
const { SECRET, TOKEN_HEADER } = require('../../config');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.use((req, res, next) => {
  // Verify that the token is valid here
  // Check if token is in the header
  const COOKIE_PARAM = req.cookies && req.cookies.token;
  const POST_PARAM = req.get(TOKEN_HEADER);
  const token = COOKIE_PARAM || POST_PARAM;

  try {
    const verified = verify(token);
    const refreshToken = sign(
      {
        _id: verified._id,
        email: verified.email
      },
      SECRET
    );

    res.cookie(TOKEN_HEADER, refreshToken);
    res.send({
      data: verified,
      refreshToken,
      willExpire: new Date(verified.exp * 1000)
    });
  } catch (err) {
    res.send({
      status: false,
      message: 'Unauthorized!',
      err
    });
  }
});

module.exports = router;
