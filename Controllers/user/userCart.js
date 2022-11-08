const userCartMgmt = require("../../Model/userCartMgmt")

const userCart = async(req,res)=>{
    let userData = req.session.user
    let cartCount = null
    if(req.session.loggedIn){
    let products=  await userCartMgmt.getCartProducts(req.session.user._id)
    cartCount = await userCartMgmt.getCartCount(req.session.user._id)
    res.render('user/cart',{admin:false,user:true,userData,products,cartCount})
    }else{
        res.render('user/userLogin',{user:false,admin:false,userData})
    }
}

const addToCart = (req,res)=>{
    userCartMgmt.addToCart(req.params.id,req.session.user._id).then(()=>{
        res.json({status:true})
    })
}

const changeProductQuantity = (req,res,next)=>{
    console.log(req.body)
    userCartMgmt.changeQuantity(req.body).then(()=>{
    })
}


module.exports = {
    userCart,
    addToCart,
    changeProductQuantity
}