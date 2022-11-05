const   userCart = (req,res)=>{
    let userData = req.session.user
    res.render('user/cart',{admin:false,user:true,userData})
}

module.exports = {
    userCart
}