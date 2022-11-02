const { response } = require('express')
const Product = require('../Model/adminProduct')
const category = require('../Model/adminCategory')
const brand = require('../Model/adminBrand')
const e = require('express')


const adminProductAction = (req,res)=>{
    if(req.session.admin){
    Product.showProduct().then((product)=>{
        res.render('admin/adminProductPage',{admin:true,user:false, title:'PRODUCTS CONTROL PAGE',product})
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

const addNewProduct = (req,res)=>{
    if(req.session.admin){
        category.showCategory().then((category)=>{
            brand.showBrand().then((brand)=>{
                res.render('admin/adminAddProductPage',{admin:true, user:false, title:'ADD PRODUCT PAGE',category,brand})
        
            })
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
          
}

const editProduct = async(req,res)=>{
    if(req.session.admin){
    let productId = req.query.id
    let product = await Product.getProductDetails(productId)
    category.showCategory().then((category)=>{
    brand.showBrand().then((brand)=>{
        res.render('admin/adminEditProductPage',{admin:true,user:false, title:'EDIT PRODUCT PAGE',category,brand,product})
    })
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}


const addProductPage = (req,res)=>{
    if(req.session.admin){
       const{
        productName,
        sellingPrice,
        category,
        brand,
        quantity,
        productDescription,
       }= req.body
        Product.doProduct({
            Picture: req.file.filename,
            productName,
            sellingPrice,
            category,
            brand,
            quantity,
            productDescription
        }).then((response)=>{
            res.redirect('/admin/adminProductPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}


const deleteProduct = (req,res)=>{
    if(req.session.admin){
    let productId = req.query.id
    Product.deleteProduct(productId).then((response)=>{
        res.redirect('/admin/adminProductPage')
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}


const editProductAction = (req,res)=>{
    if(req.session.admin){
    let id = req.body.id
    let newProductData= req.body
    let newImageId = req.file.filename
    Product.editProduct(id, newProductData, newImageId).then(()=>{
        Product.showProduct().then((product)=>{
            
            res.render("admin/adminProductPage",{admin:true,user:false, title:'PRODUCT CONTROL PAGE',product})
        })
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

module.exports={
    adminProductAction,
    addNewProduct,
     addProductPage,
     editProduct,  
    deleteProduct,
    editProductAction
}