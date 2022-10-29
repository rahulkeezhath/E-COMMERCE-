const express = require('express')
const router = express.Router()
const admin = require('../Controllers/adminLoginController')
const addCategory = require('../Controllers/adminCategoryController')
const addBrand = require('../Controllers/adminBrandController')
const addProduct = require('../Controllers/adminProductController')
const multer = require('multer')
const { route } = require('./user')


//Multer Start
const storage = multer.diskStorage({
    destination: './public/admin/images',
    filename:(req, file, cb)=>{
        cb(null, Date.now()+file.originalname)
    }
})


const upload = multer({
storage : storage,
fileFilter:(req,file,cb)=>{
    if(
        file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/webp'
    ){
        cb(null, true)
    }else{
        cb(null, false)
        cb(new Error('only jpeg, jpg, png, webp'))
    }
}    
})


//Multer End



//Admin router
router.get('/',admin.adminLoginPage)
router.post('/adminLoginAction',admin.adminLoginAction)
router.get('/adminHome',admin.adminHome)  

//User router

router.get('/adminUserpage',admin.adminUserPage)  




//Category router

router.get('/adminCategoryPage',addCategory.adminCategoryAction)
router.post('/addCategory',addCategory.addNewCategory)
router.get('/deleteCategory',addCategory.deleteCategory)

// Brand router

router.get('/adminBrandPage',addBrand.adminBrandAction)
router.post('/addBrand',addBrand.addNewBrand)
router.get('/deleteBrand',addBrand.deleteBrand)

// Product router

router.get('/adminProductPage',addProduct.adminProductAction)
router.get('/addProducts',addProduct.addNewProduct)
router.post('/addNewProduct',upload.single('productImage'),addProduct.addProductPage)
router.get('/editProduct',addProduct.editProduct)
router.post('/editProductAction',upload.single('productImage'),addProduct.editProductAction)
router.get('/deleteProduct',addProduct.deleteProduct)

// Order router
router.get('/adminOrderPage',admin.adminOrderPage)


// Logout router 
router.get('/adminLogout',admin.adminLoginPage) 


module.exports = router