const userCheckout = (req,res)=>{
  let userData = req.session.user
  res.render('user/checkout',{admin:false,user:true,userData})
}

module.exports = {
  userCheckout
}
