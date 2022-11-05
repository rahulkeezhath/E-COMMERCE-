const { response } = require('express')
const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports = {
    addToCart:(productId,userId)=>{
            return new Promise(async(resolve,reject)=>{
                let userCart = await db.get().collection(collection.ADD_CART).findOne({user:ObjectId(userId)})
                if(userCart){
                    db.get().collection(collection.ADD_CART).updateOne({user:ObjectId(userId)},
                    {
                        $push:{products:ObjectId(productId)}
                    }
                    ).then((response)=>{
                        resolve()
                    })
                }else{
                    let cartObj={
                        user:ObjectId(userId),
                        products:[ObjectId(productId)]
                    }
                    db.get().collection(collection.ADD_CART).insertOne(cartObj).then((response)=>{
                        resolve()
                    })
                }
            })
    }
}