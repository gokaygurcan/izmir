const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'secret'
const sign =  data => jwt.sign(data, SECRET, {expiresIn: 30 * 60}) // 30 minutes * 60 seconds
const verify = () => jwt.verify()

module.exports = {sign, verify}