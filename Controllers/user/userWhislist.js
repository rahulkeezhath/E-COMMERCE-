const userWishlist = (req,res)=>{
    res.render('user/wishlist',{admin:false,user:true})
}

module.exports = {
    userWishlist
}