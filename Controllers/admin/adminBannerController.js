const adminBanner = require('../../Model/adminBanner')

const adminBannerPage = (req,res)=>{
    if(req.session.admin){
        adminBanner.showBanner().then((banner)=>{
             res.render('admin/adminBannerPage',{admin:true,user:false, title:'Banners',banner})
        })
   
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

const addBannerPage = (req,res)=>{
    if(req.session.admin){
       const{
        newBanner,
       }= req.body
        adminBanner.doBanner({
            productImage: req.file.filename,
            newBanner,
        }).then((response)=>{
            res.redirect('/admin/adminBannerPage')
        })
    }else{
        res.render('admin/adminLogin',{admin:false,user:false})
    }
}


const deleteBanner = (req,res)=>{
    if(req.session.admin){
    let id = req.body.bannerId
    adminBanner.deleteBanner(id).then((response)=>{
        res.json(response)
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

module.exports = {
    adminBannerPage,
    addBannerPage,
    deleteBanner,
  
}