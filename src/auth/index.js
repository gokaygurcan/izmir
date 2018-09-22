import express from 'express'
const router = express.Router()
import bodyParser from 'body-parser'
console.log(bodyParser)
router.use(bodyParser)
// define the home page route
router.post('/login', function (req, res) {
    res.send('Birds home page')
})
router.post('/validate', function (req, res) {
    res.send('Birds home page')
})
router.post('/register', function (req, res) {
    res.send('Birds home page')
})
export default router
