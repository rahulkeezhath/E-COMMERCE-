const { response } = require('express')
const adminCategory = require('../Model/adminCategory')




const adminCategoryAction = (req,res)=>{  
    if(req.session.admin){
    adminCategory.showCategory().then((category)=>{
        res.render('admin/adminCategoryPage',{admin:true, user:false, title:"CATEGORY CONTROL PAGE",category})
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

const addNewCategory = (req,res)=>{
    if(req.session.admin){
    adminCategory.doCategory(req.body).then((response)=>{
        res.redirect('/admin/adminCategoryPage') 
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}




const deleteCategory = (req,res)=>{
    if(req.session.admin){
    let categoryId = req.query.id
    adminCategory.deleteCategory(categoryId).then((response)=>{
        res.redirect('/admin/adminCategoryPage')
    })
}else{
    res.render('admin/adminLogin',{admin:false,user:false})
}
}

module.exports={
    adminCategoryAction,  
    addNewCategory,
    deleteCategory   
}