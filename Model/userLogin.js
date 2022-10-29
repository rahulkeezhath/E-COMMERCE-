const bcrypt = require('bcrypt')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response ={}
            let user = await db.get().collection(collection.USER_CREDENTIALS).findOne({name:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    console.log(status);
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login not success")
                resolve({status:false})
            }
        })
    },
    doSignup:(signupData)=>{
        return new Promise(async(resolve,reject)=>{
            signupData.password=await bcrypt.hash(signupData.password,10)
            signupData.confirmPassword=await bcrypt.hash(signupData.confirmPassword,10)
            db.get().collection(collection.USER_CREDENTIALS).insertOne(signupData).then((data)=>{
                resolve.apply(data)
            })
        })

    }
}