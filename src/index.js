const express = require('express')

// Routes
const {PORT} = require('./config')
const app = express()

app.use('/guard',require('./routes/auth/guard'))
app.use('/auth',require('./routes/auth'))

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
