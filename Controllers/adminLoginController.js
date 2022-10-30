const { response } = require('express')
const adminLogin = require('../Model/adminLogin')

const adminLoginPage = (req,res)=>{
    if(req.session.admin){
    res.render('admin/adminHome',{admin:true,title:'ADMIN HOME PAGE'})
}else{
    res.render('admin/adminLogin',{admin:false})
}
}
const adminLoginAction = (req,res)=>{
    console.log(req.body);
    adminLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.admin = true
            res.render('admin/adminHome',{admin:true,title:'ADMIN HOME'})
        }
        else{
            res.redirect('/admin')
        }
    })
}

const adminHome = (req,res)=>{
    if(req.session.admin){
    res.render('admin/adminHome',{admin:true,title:'DASHBOARD'})
}else{
    res.render('admin/adminLogin',{admin:false})
}
}

const adminLogout = (req,res)=>{
    req.session.destroy(function(err){
        if(err)
        console.log('error');
        else
        res.redirect('/admin')
    })
}

const adminOrderPage = (req,res)=>{
    res.render('admin/adminOrderPage',{admin:true,title:'ORDERS'})
}

module.exports={
    adminLoginPage,
    adminLoginAction,
    adminHome,
    adminLogout,
    adminOrderPage
}
