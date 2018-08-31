require('dotenv').config()
import express from 'express';
import Governor from 'lib/Governor'

const {PORT} = process.env
const governor = new Governor()
governor.loadPlugins()

const app = express()
app.get('/_', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
