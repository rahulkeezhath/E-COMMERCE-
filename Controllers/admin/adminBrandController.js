const { response } = require('express')
const brand = require('../../Model/adminBrand')
const category = require('../../Model/adminCategory')

const adminBrandAction = (req,res)=>{
    if(req.session.admin){
        category.showCategory().then((category)=>{  
    brand.showBrand().then((brand)=>{
     res.render('admin/adminBrandPage',{admin:true,user:false,title:'BRAND CONTROL PAGE',brand,category})
    })
})
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

const addNewBrand = (req,res)=>{
    if(req.session.admin){
    brand.doBrand(req.body).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    }) 
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

const getBrand = async(req,res)=>{
    let brandId = req.query.id
    let brandNewData = await brand.getBrand(brandId)
    if(req.session.admin) {
        category.showCategory().then((brand)=>{
            res.render('admin/adminBrandPage',{admin:true,user:false, brand, brandNewData, title:'EDIT BRAND PAGE'})
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}

const editBrandAction = (req,res)=>{
    let id = req.body.brandId
    let brandName = req.body.editBrand
    if(req.session.admin){
    brand.editBrand(id,brandName).then(()=>{
        res.redirect('/admin/adminBrandPage')
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}



const deleteBrand = (req,res)=>{
    if(req.session.admin){
    let brandId = req.query.id
    brand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}



module.exports={
    adminBrandAction,
    addNewBrand,
    getBrand,
    editBrandAction,
    deleteBrand
}
  