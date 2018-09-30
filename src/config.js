require('dotenv').config()
const config = {
	SECRET: process.env.SECRET || ' ',
	PORT: process.env.PORT || 8080,
	TOKEN_HEADER: 'token',
	TOKEN_EXPIRES_IN: 30, // minutes
}

module.exports = config