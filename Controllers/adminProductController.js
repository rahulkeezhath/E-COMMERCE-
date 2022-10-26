const { response } = require('express')
const Product = require('../Model/adminProduct')


const adminProductAction = (req,res)=>{
    Product.showProduct().then((product)=>{
        res.render('admin/adminProductPage',{admin:true,title:'PRODUCTS CONTROL PAGE',product})
    })
   
}

const addNewProduct = (req,res)=>{
        res.render('admin/adminAddProductPage',{admin:true,title:'ADD PRODUCT PAGE'})  
}

const addProductPage = (req,res)=>{
    Product.doProduct(req.body).then((response)=>{
    res.redirect('/admin/adminProductPage')
})
}


const deleteProduct = (req,res)=>{
    let productId = req.query.id
    Product.deleteProduct(productId).then((response)=>{
        res.redirect('/admin/adminProductPage')
    })
}

module.exports={
    adminProductAction,
    addNewProduct,
    addProductPage,
    deleteProduct
}