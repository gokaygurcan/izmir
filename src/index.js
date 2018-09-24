require('dotenv').config()
const express = require('express')

// Routes
const auth = require('./auth')

const {PORT} = process.env
const app = express()

app.use('/auth',auth)

app.get('/_', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
