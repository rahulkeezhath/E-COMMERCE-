const e = require('express')
const { response } = require('express')
const { ReturnDocument } = require('mongodb')
const userLogin = require('../../Model/userLogin')
const nodemailer = require('nodemailer')
const userFrontDisplay = require('../../Model/userFrontDisplay')
const categoryDisplay = require('../../Model/adminCategory')
const bannerDisplay = require('../../Model/adminBanner')


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rahulkeezhath@gmail.com',
        pass: 'dqpokhvqyfryntha'
    }
})
 
const OTP = `${Math.floor(1000+ Math.random() * 9000 )}`;


const userLoginPage = (req,res)=>{  
    let userData = req.session.user
    bannerDisplay.showBanner().then((banner)=>{
    userFrontDisplay.displayProducts().then((product)=>{
        categoryDisplay.showCategory().then((category)=>{
        res.render('user/userHomeLanding',{admin:false,user:true,userData,product,category,banner})
    }) 
})
})
}


const userLoginControl = (req,res)=>{
    let userData = req.session.user
    userLogin.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.loggedIn=true
            req.session.user= response.user
            bannerDisplay.showBanner().then((banner)=>{
            userFrontDisplay.displayProducts().then((product)=>{
                res.redirect('/')
        // res.render('user/userHomeLanding',{admin:false,user:true,product,banner})
            })
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
        let userData = req.session.user
        userFrontDisplay.displayProducts().then((product)=>{
        bannerDisplay.showBanner().then((banner)=>{
        userLogin.userVerified(userID).then((response)=>{
            console.log('Success');
            res.render('user/userHomeLanding',{admin:false,user:true,banner,product,userData})
        })
    })
})
       
    }else{
        console.log('Not Successful');
    }
}


const userSignoutAction = (req,res)=>{
    req.session.destroy((err)=>{
        if(err) {
            console.log("Error");
            res.send("Error")
        }else{
            res.redirect('/')
        }
    })
    // bannerDisplay.showBanner().then((banner)=>{
    // userFrontDisplay.displayProducts().then((product)=>{
    // res.render('user/userHomeLanding',{admin:false,user:true,product,banner})
//     })
// }) 
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