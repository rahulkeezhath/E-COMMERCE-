const express = require('express')
const router = express.Router()
const admin = require('../Controllers/adminLoginController')
const addCategory = require('../Controllers/adminCategoryController')
const addBrand = require('../Controllers/adminBrandController')
const addProduct = require('../Controllers/adminProductController')
const multer = require('multer')


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
        file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'
    ){
        cb(null, true)
    }else{
        cb(null, false)
        cb(new Error('only jpeg, jpg'))
    }
}    
})


//Multer End




router.get('/',admin.adminLoginPage)
router.post('/adminLoginAction',admin.adminLoginAction)
router.get('/adminHome',admin.adminHome)  
router.get('/adminUserpage',admin.adminUserPage)  
router.get('/adminOrderPage',admin.adminOrderPage)
router.get('/adminCategoryPage',addCategory.adminCategoryAction)
router.post('/addCategory',addCategory.addNewCategory)
router.get('/deleteCategory',addCategory.deleteCategory)
router.get('/adminBrandPage',addBrand.adminBrandAction)
router.post('/addBrand',addBrand.addNewBrand)
router.get('/deleteBrand',addBrand.deleteBrand)
router.get('/adminProductPage',addProduct.adminProductAction)
router.get('/addProduct',addProduct.addNewProduct)
// router.post('/addProduct',addProduct.addProductPage)
router.post('/addProduct',upload.array('productImage',5),addProduct.addProductPage)
router.get('/deleteProduct',addProduct.deleteProduct)
router.get('/adminLogout',admin.adminLoginPage) 







module.exports = router