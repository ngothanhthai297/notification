const express = require('express')
const app = express()
const router = require('./routers/index')

app.set("view engine","ejs")
app.set("views","views")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(require('cors')());
app.use('/', router)

app.get('/chat',function(req,res) {
    res.render("home")
})
app.get('/admin',function(req,res) {
    res.render("home1")
})

module.exports = app