const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Database = require("../../Database") 
const userCollection = new Database("users")
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
router.post('/register', async (req, res)=> {
    const {username} = req.body
		// check if username exists
	  const usersfound = await userCollection.find({username}) 
		if(usersfound.length > 0){
			res.send({status:false})
		}
		res.send('Birds home page')
})

module.exports = router
