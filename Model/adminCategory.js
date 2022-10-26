const { ObjectId } = require('mongodb')
const collection = require('../config/collection')
const db = require('../config/connection')

module.exports={
    doCategory:(addCategory)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(addCategory)
            db.get().collection(collection.ADD_CATEGORY).insertOne(addCategory).then((data)=>{
                resolve(data)
            })
        })
    },
    showCategory:()=>{
        return new Promise(async(resolve,reject)=>{
            let category = await db.get().collection(collection.ADD_CATEGORY).find().toArray()
            resolve(category)
        })
    },
    deleteCategory:(categoryId)=>{
        return new Promise(async(resolve,reject)=>{
            await db.get().collection(collection.ADD_CATEGORY).deleteOne({_id:ObjectId(categoryId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}   