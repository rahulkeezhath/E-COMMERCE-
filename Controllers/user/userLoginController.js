const e = require('express')
const { response } = require('express')
const { ReturnDocument } = require('mongodb')
const userLogin = require('../../Model/userLogin')
const nodemailer = require('nodemailer')
const userFrontDisplay = require('../../Model/userFrontDisplay')
const categoryDisplay = require('../../Model/adminCategory')


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulkeezhath@gmail.com',
        pass: 'dqpokhvqyfryntha'
    }
})
 
const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;


const userLoginPage = (req,res)=>{
    userFrontDisplay.displayProducts().then((product)=>{
        categoryDisplay.showCategory().then((category)=>{
        res.render('user/userHomeLanding',{admin:false,user:true,product,category})
    }) 
})
}


const userLoginControl = (req,res)=>{
    userLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            userFrontDisplay.displayProducts().then((product)=>{
        res.render('user/userHome',{admin:false,user:false,product})
    }) 
    }else{
        res.redirect('/login')
    }
    })  
}

const userLoginAction = (req,res)=>{
    res.render('user/userLogin',{admin:false,user:false})
}



const userSignupPage = (req,res)=>{
    res.render('user/userSignup',{admin:false,user:false})
}

const userSignupAction = (req,res)=>{
    console.log(req.body);
    let verified = 0

    const{name,email,phoneNumber,password} = req.body
        let mailDetails = {
            from: 'rahulkeezhath@gmail.com',
            to: email,
            subject: 'FOODY REGISTRATION',
            html: `<p> YOUR OTP FOR REGISTRATION IN FOODY IS ${OTP}</p>`
        }
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        })
    
    userLogin.doSignup(verified,name,email,phoneNumber,password).then((response)=>{
        userID = response.insertedId
    console.log(response);
        res.render('user/otpVerification',{admin:false,user:false})
    })
    
}

const verifyOtp = (req,res)=>{
    if(OTP == req.body.Otp){
        userLogin.userVerified(userID).then((response)=>{
            console.log('Success');
            res.render('user/userHome',{admin:false,user:false})
        })
       
    }else{
        console.log('Not Successful');
    }
}


const userSignoutAction = (req,res)=>{
    userFrontDisplay.displayProducts().then((product)=>{
    res.render('user/userHomeLanding',{admin:false,user:true,product})
}) 
}

module.exports={
    userLoginPage,
    userLoginAction,
    userLoginControl,
    userSignupAction,
    userSignupPage,
    verifyOtp,
    userSignoutAction,
}