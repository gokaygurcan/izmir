import express from 'express';
import Governor from 'lib/Governor'

const governor = new Governor()
const { PORT } = governor.getConfig()

const app = express()
app.get('/_', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
