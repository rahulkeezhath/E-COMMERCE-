const userCheckout = (req,res)=>{
  res.render('user/checkout',{admin:false,user:true})
}

module.exports = {
  userCheckout
}
