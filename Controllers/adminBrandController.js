const brand = require('../Model/adminBrand')
const category = require('../Model/adminCategory')

const adminBrandAction = (req,res)=>{
    if(req.session.admin){
    brand.showBrand().then((brand)=>{
     res.render('admin/adminBrandPage',{admin:true,title:'BRAND CONTROL PAGE',brand,category})
    })
    }else{
        res.render('admin/adminLogin',{admin:false})
    }
}

const addNewBrand = (req,res)=>{
    if(req.session.admin){
    brand.doBrand(req.body).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    }) 
}else{
    res.render('admin/adminLogin',{admin:false})
}
}

const deleteBrand = (req,res)=>{
    if(req.session.admin){
    let brandId = req.query.id
    brand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}else{
    res.render('admin/adminLogin',{admin:false})
}
}

module.exports={
    adminBrandAction,
    addNewBrand,
    deleteBrand
}
  