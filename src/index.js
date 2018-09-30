const express = require('express')

// Routes
const {PORT} = require('./config')
const app = express()

app.use('/auth',require('./auth'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
