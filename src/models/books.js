const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book:{
        type: String,
        required: true,
    },
    auther:{
        type: String,
        required: true,
    },
    genres:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    }
},{timestamps: true})
const Book = mongoose.model('Book',bookSchema)

module.exports = Book 