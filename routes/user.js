const express = require('express')
const router = express.Router()
const user = require('../Controllers/userLoginController')

router.get('/',user.userLoginPage)
router.post('/userLoginAction',user.userLoginAction)
router.get('/signup',user.userSignupPage)


module.exports=router