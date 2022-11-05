const express = require('express')
const router = express.Router()
const user = require('../Controllers/user/userLoginController')
const userCart = require('../Controllers/user/userCart')
const userProduct = require('../Controllers/user/userProductDisplay')
const userShop = require('../Controllers/user/userShop')
const userWishlist = require('../Controllers/user/userWhislist')
const userCheckout = require('../Controllers/user/userCheckout')


router.get('/',user.userLoginPage)
router.post('/userLoginAction',user.userLoginPage)
router.get('/login',user.userLoginAction)
router.post("/login",user.userLoginControl)

router.post('/signup',user.userSignupAction)
router.get('/signup',user.userSignupPage)
router.get('/logout',user.userSignoutAction)
router.post('/verifyOtp',user.verifyOtp)


router.get('/cart',userCart.userCart)

router.get('/viewSingleProduct',userProduct.showProductDetails)

router.get('/viewCategory',userShop.viewShop)

router.get('/wishlist',userWishlist.userWishlist)

router.get('/checkout',userCheckout.userCheckout)

module.exports=router