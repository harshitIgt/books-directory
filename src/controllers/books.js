const {handleError, handleResponse} = require('../utils/helper')
const Book = require('../models/books')

exports.getAllBooks = async (req,res) => {
    try{
        const books = await Book.find({})
        handleResponse(res,books,200)
        return
    }catch(error){
        handleError(res,error,404)
        return
    }
}

exports.getBookDetails = async (req, res) =>{
    try{
        const id = req.params.id
        const bookDetails = await Book.findById({_id:id})
        if(!bookDetails){
            handleError(res,"Book Dose Not Found", 404)
            return
        }
        handleResponse(res,bookDetails)
        return
    }catch(error){
        handleError(res, error)
        return
    }
}

exports.postNewBook = async (req, res) => {
    try{
        const {book, auther, genres, description} = req.body
        if(!book || !auther || !genres ){
            handleError(res,"Book Name, Auther, Genres are mendetory")
            return
        }
        const newBook = await Book.create({
            book,
            auther,
            genres,
            description
        })
        if( !newBook ){
            handleError(res,"Book is not added",400)
            return
        }
        return res.status(201).redirect('/')

    }catch(error){
        handleError(res,error)
        return
    }
}   

exports.editBookDetails = async (req, res) => {
    try{
        const id = req.params.id
        const {book, auther, genres, description} = req.body
        const bookDetails = await Book.findById({_id:id})
        if( !bookDetails ){
            handleError(res,"book not Found",404)
            return
        }
        await Book.updateOne({
            book,
            auther,
            genres,
            description
        })
        handleResponse(res,bookDetails,202)
        return
    }catch(error){
        handleError(res,error)
        return
    }
}

exports.deleteBook = async (req, res) => {
    try{
        const id = req.params.id
        const bookDetails = await Book.findById({_id:id})
        if( !bookDetails ){
            handleError(res,"book not Found",404)
            return
        }
        const deletedBook = await Book.deleteOne({_id:id})
        if( !deletedBook ){
            handleError(res,"Book is not Delete")
            return
        }
        res.status(200).redirect('/')
        return

    }catch(error){
        handleError(res, error)
        return
    }

}

exports.findBook = async(req,res) => {
    try{
        const obj = JSON.parse(JSON.stringify(req.body))
        const book = obj.search
        const bookDetails = await Book.find({book: book})
        if(!bookDetails){
            handleError(res,error,404)
            return
        }
        return res.status(200).render('searchPage',{books: bookDetails})
    }catch(error){
        handleError(res,error,404)
        return
    }
}

exports.getAuthers = async (req,res) => {
    try{
        const bookDetails = await Book.find({});
        let auther = [] 
        bookDetails.forEach(d => {
            auther.push(d.auther)
         });

    const Auther = [ ...new Set(auther)]
   res.status(200).render('auther',{books:Auther})
   return

    }catch(error){
        handleError(res,error)
        return
    }
}

exports.getGenres = async (req,res) => {
    try{
        const bookDetails = await Book.find({});
        let genres = []
        bookDetails.forEach(d => {
           genres.push(d.genres)
        });
    const Genres = [ ...new Set(genres)] 
   res.status(200).render('genres',{books: Genres})
   return

    }catch(error){
        handleError(res,error)
        return
    }
}