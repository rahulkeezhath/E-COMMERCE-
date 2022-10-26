const express = require('express')
const app = express()
const port = 5000
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const session = require('express-session')
const cookie = require('cookie-parser')
const db = require('./config/connection')


app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))
app.use(expressLayouts)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({secret:"key",
saveUninitialized:true,
cookie:{maxAge:600000},
resave:false}))

app.use(cookie())
app.use(function (req, res, next) {
  res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.set('views','./views')
app.set('view engine','ejs')
app.set('layout','./layout/layout')


db.connect((err)=>{
    if(err) console.log("Connection Error" +err)
    else console.log("Database Connection Successfully")
})

app.use('/admin',adminRouter)
app.use('/',userRouter)


  
app.listen(port,()=>{
    console.log("Server Started")
})