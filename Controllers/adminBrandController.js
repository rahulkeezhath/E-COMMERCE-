const brand = require('../Model/adminBrand')
const category = require('../Model/adminCategory')

const adminBrandAction = (req,res)=>{
    brand.showBrand().then((brand)=>{
     res.render('admin/adminBrandPage',{admin:true,title:'BRAND CONTROL PAGE',brand,category})
    })
    }

const addNewBrand = (req,res)=>{
    brand.doBrand(req.body).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    }) 
}

const deleteBrand = (req,res)=>{
    let brandId = req.query.id
    brand.deleteBrand(brandId).then((response)=>{
        res.redirect('/admin/adminBrandPage')
    })
}

module.exports={
    adminBrandAction,
    addNewBrand,
    deleteBrand
}
  