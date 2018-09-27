const config = require('../config.js')
const jwt = require('jsonwebtoken')

const sign =  data => jwt.sign(data, config.SECRET, {expiresIn: config.TOKEN_EXPIRE * 60}) // 30 minutes * 60 seconds
const verify = token => jwt.verify(token,config.SECRET)

module.exports = {sign, verify}