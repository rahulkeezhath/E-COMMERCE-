const userCart = (req,res)=>{
    res.render('user/cart',{admin:false,user:true})
}

module.exports = {
    userCart
}