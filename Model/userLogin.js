const bcrypt = require('bcrypt')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response ={}
            let user=await db.get().collection(collection.USER_CRENTIALS).findOne({username:userData.name})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    
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
    }
}