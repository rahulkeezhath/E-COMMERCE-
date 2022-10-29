const e = require('express')
const { response } = require('express')
const { ReturnDocument } = require('mongodb')
const userLogin = require('../Model/userLogin')

const userLoginPage = (req,res)=>{
    res.render('user/userHome',{admin:false,user:true})
}


const userLoginControl = (req,res)=>{
    userLogin.doLogin(req.body).then((response)=>{
        if(response.status){
        res.render('user/userHomeLanding',{admin:false,user:true})
    }else{
        res.redirect('/login')
    }
    })  
}

const userLoginAction = (req,res)=>{
    res.render('user/userLogin',{admin:false,user:true})
}



const userSignupPage = (req,res)=>{
    res.render('user/userSignup',{admin:false,user:false})
}

const userSignupAction = (req,res)=>{
    console.log(req.body);
    userLogin.doSignup(req.body).then((response)=>{
    console.log(response);
        res.render('user/userHomeLanding',{admin:false,user:true})
    })
    
}



const userSignoutAction = (req,res)=>{
    res.render('user/userHome',{admin:false,user:false})
}

module.exports={
    userLoginPage,
    userLoginAction,
    userLoginControl,
    userSignupAction,
    userSignupPage,
    userSignoutAction,
}