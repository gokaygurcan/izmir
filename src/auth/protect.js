const express = require('express')
const bodyParser = require('body-parser')

const SECRET = process.env.SECRET || ' '

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))

router.use((req,res,next) => {

})

module.exports = router