const { response } = require('express')
const adminLogin = require('../Model/adminLogin')

const adminLoginPage = (req,res)=>{
    res.render('admin/adminLogin',{admin:false})
}
const adminLoginAction = (req,res)=>{
    console.log(req.body);
    adminLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            res.render('admin/adminHome',{admin:true,title:'ADMIN HOME'})
        }
        else{
            res.redirect('/admin')
        }
    })
}

const adminHome = (req,res)=>{
    res.render('admin/adminHome',{admin:true,title:'DASHBOARD'})
}

const adminOrderPage = (req,res)=>{
    res.render('admin/adminOrderPage',{admin:true,title:'ORDERS'})
}

module.exports={
    adminLoginPage,
    adminLoginAction,
    adminHome,
    adminOrderPage
}
