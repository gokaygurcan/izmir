const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const Database = require("../lib/Database")
const crypto = require('crypto')

const userCollection = new Database("users")
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))

// define the home page route
router.post('/login', function (req, res) {
	console.log(req.body)
	res.send('Birds home page')
})
router.post('/validate', function (req, res) {
	res.send('Birds home page')
})
router.post('/register', async (req, res) => {
	// Required fields
	['email','password'].forEach(key => {
		if(!req.body.hasOwnProperty(key)){
			res.send({status:false,message:`${key} is missing!`})
			return
		}
	})
	
	const {email, password} = req.body
	// check if username exists
	const usersfound = await userCollection.find({
		email
	})
	if (usersfound.length > 0) {
		res.send({
			status: false,
			message: `${email} is already registered!`
		})
		return
	} else {
		const hashed = crypto
			.createHash('sha256')
			.update(password)
			.digest('base64')
		userCollection.insert({email,password:hashed})
			.then(createdUser => {
				res.send({
					status: true,
					email:createdUser.email,
					_id: createdUser._id
				})
				return
			})
			.catch(err => {
				console.log(err)
				res.send({status:false,message: 'There has been an error'})
			})
	}
	
})

module.exports = router