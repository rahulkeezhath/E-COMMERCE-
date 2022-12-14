const { response } = require("express")
const userCartMgmt = require('../../Model/userCartMgmt')

const userCheckout = (req,res)=>{
  let userData = req.session.user
  res.render('user/checkout',{admin:false,user:true,userData})
}

const placeOrder = async(req,res)=>{
  let userData = req.session.user
  let cartCount = null
  if(req.session.user){
  cartCount = await userCartMgmt.getCartCount(req.session.user._id)
  let products=  await userCartMgmt.getCartProducts(req.session.user._id)
  let totalAmount = await userCartMgmt.getTotalAmount(req.session.user._id)
  res.render('user/checkout',{admin:false,user:true,userData,cartCount,products,totalAmount})
  }
}

const payment = (req,res)=>{
 console.log(req.body);
 }

module.exports = {
  userCheckout,
  placeOrder,
  payment
}
