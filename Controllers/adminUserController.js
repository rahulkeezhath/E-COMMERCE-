const adminUser = require('../Model/adminUser')

const adminUserPage = (req,res)=>{
    if(req.session.admin) {
    adminUser.showUser().then((user_Details)=>{
    res.render('admin/adminUserPage',{admin:true,title:'USER CONTROL PAGE',user_Details})
})
    }else{
        res.render('admin/adminLogin',{admin:false})
    }
}


module.exports = {
    adminUserPage
}