// 发表内容页面

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/forum')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    console.log('success mongoose')
})

let userSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Invitation', userSchema)