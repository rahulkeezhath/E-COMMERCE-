const categoryProducts = require('../../Model/userCategoryShop')
const brand = require('../../Model/adminBrand')
const category = require('../../Model/adminCategory')

const viewShop = async(req,res)=>{
    let userData = req.session.user
    let categoryId = req.query.id
    let product = await categoryProducts.viewProductDetails(categoryId)
  
        res.render('user/categoryShop',{admin:false,user:true,userData,product})
   
}

module.exports = {
    viewShop
}