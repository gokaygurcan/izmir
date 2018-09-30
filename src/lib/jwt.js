const config = require('../config')
const jwt = require('jsonwebtoken')
const {SECRET, TOKEN_EXPIRES_IN} = config
export const sign =  data => jwt.sign(data, SECRET, {expiresIn: TOKEN_EXPIRES_IN * 60}) // 30 minutes * 60 seconds
export const verify = token => jwt.verify(token,SECRET)
