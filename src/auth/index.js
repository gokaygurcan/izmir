import express from 'express'
const router = express.Router()
import bodyParser from 'body-parser'

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// define the home page route
router.post('/login', function (req, res) {
    console.log(req.body)
    res.send('Birds home page')
})
router.post('/validate', function (req, res) {
    res.send('Birds home page')
})
router.post('/register', function (req, res) {
    res.send('Birds home page')
})
export default router
