const adminUser = require('../Model/adminUser')

const adminUserPage = (req,res)=>{
    adminUser.showUser().then((user_Details)=>{
    res.render('admin/adminUserPage',{admin:true,title:'USER CONTROL PAGE',user_Details})
})
}


module.exports = {
    adminUserPage
}