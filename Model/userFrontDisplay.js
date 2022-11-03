const db = require('../config/connection')
const collection = require('../config/collection')

module.exports = {
    displayProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let product = await db.get().collection(collection.ADD_PRODUCT).find().toArray()
            resolve(product)
        })
    }
}