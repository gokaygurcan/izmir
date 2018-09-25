const express = require('express')
const bodyParser = require('body-parser')
const {verify} = require('./../lib/jwt')
const SECRET = process.env.SECRET || ' '

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))

router.use((req,res,next) => {
    // Verify that the token is valid here
})

module.exports = router