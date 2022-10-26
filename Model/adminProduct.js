const { ObjectId } = require("mongodb")
const collection = require("../config/collection")
const db = require('../config/connection')

module.exports={
    doProduct:(addProduct)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(addProduct)
            db.get().collection(collection.ADD_PRODUCT).insertOne(addProduct).then((data)=>{
                resolve(data)
            })
        })
    },
    showProduct:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.ADD_PRODUCT).find().toArray()
            resolve(product)
        })
    },
    deleteProduct:(productId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_PRODUCT).deleteOne({_id:ObjectId(productId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}