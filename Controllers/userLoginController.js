const { response } = require('express')
const { ReturnDocument } = require('mongodb')
const userLogin = require('../Model/userLogin')

const userLoginPage = (req,res)=>{
    res.render('user/userLogin',{admin:false,user:false})
}

const userLoginAction = (req,res)=>{
     console.log(req.body)
            res.render('user/userHome',{admin:false,user:true})
}

const userSignupPage = (req,res)=>{
    res.render('user/userSignup',{admin:false,user:false})
}

module.exports={
    userLoginPage,
    userLoginAction,
    userSignupPage
}