const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {verify,sign} = require('./../../lib/jwt')
const config = require('../../config')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))

router.use((req,res,next) => {
    // Verify that the token is valid here
    
    // Check if token is in the header
    const HEADER_Param = req.get('token')
    const POST_Param = req.body.token
    const token = HEADER_Param || POST_Param
    
    try{
        const verified = verify(token)
        const refreshToken = sign({
            _id:verified._id,
            email:verified.email
        },config.SECRET)
        res.send({
            status: true,
            data:verified,
            refreshToken,
            message: 'Authorized!'
        })
    } catch(err) {
        console.log(err)
        res.send({
            status: false,
            message:'Unauthorized!',
            err
        })
    }
    

})

module.exports = router