const productDisplay = require('../../Model/userFrontDisplay')

const showProductDetails = async(req,res)=>{
    let userData = req.session.user
    let productId = req.query.id
    let product = await productDisplay.viewProductDetails(productId)

    res.render('user/singleProduct',{user:true,admin:false, product,userData})
}

module.exports = {
    showProductDetails
}