const express = require('express')
const router = express.Router()

const {books} = require('../controllers/index')

//****************************************Book PagesRoute*******************************************************//
router.get('/add', async(req,res)=>{
    return res.status(200).render('addNewBook')
})

//******************************************Routes***************************************************************//
router.get('/',books.getAllBooks).get('/authers',books.getAuthers).get('/genres',books.getGenres)
router.get('/:id',books.getBookDetails).get('/del/:id',books.deleteBook) 
router.post('/',books.postNewBook).post('/find',books.findBook)
router.put('/:id',books.editBookDetails)



module.exports = router ;