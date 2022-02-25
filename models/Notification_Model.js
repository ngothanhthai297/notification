const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notification = new Schema({
    address:{ type: String,},
    title:{  type: String,},
    content: { type: String, },
    status: {type: Number,default: 1},
    images: { type: String,},
    type: {type: String,},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Notification', notification)