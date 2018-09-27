require('dotenv').config()
const express = require('express')

// Routes
const auth = require('./routes/auth')
const guard = require('./routes/auth/guard')
const {PORT} = process.env
const app = express()

app.use('/auth',auth)

app.get('/_', (req, res) => res.send('Hello World!'))

app.post('/protected',guard)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
