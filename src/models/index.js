const { default: mongoose } = require("mongoose");
const { handleError } = require("../utils/helper");

 mongoose.connect(process.env.MONGOURL)
        .then((e) => console.log("mongoDB conected"))


const db = {
    Book: require('./books')
}

module.exports =   db
