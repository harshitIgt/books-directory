const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const { connectDb, Book } = require('./src/models')
const bookRoute = require('./src/routes/books')
const { handleResponse } = require('./src/utils/helper')


app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.set('views',path.join(__dirname,'views'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', async (req, res) => {

    const bookDetails = await Book.find({});
    res.status(200).render('home',{books: bookDetails,})
})

app.use('/books',bookRoute)


const PORT  = process.env.PORT || 5001
app.listen(PORT,(req,res)=>{
    console.log(`app is working on port: ${PORT}`)
})
