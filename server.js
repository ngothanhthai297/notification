require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.URL_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection.on('error', (err) => {
    console.log('Connect fail! ' + err.message)
})

mongoose.connection.once('open', () => {
    console.log('Connect success!')
})

const app = require('./app')

const server = app.listen(process.env.PORT , () => console.log('Running'))

var io = require("socket.io")(server)
io.on("connection",function (socket) {
    console.log("Co ket noi: "+ socket.id)
    socket.on("messageSent",function(message){
        // console.log("Id: " +socket.id + "Da ngat ket noi")
        // socket.broadcast.emit("messageSent",message)
        socket.broadcast.emit("messageSent", message);
    })
})