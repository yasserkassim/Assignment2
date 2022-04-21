const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    bookNum:{type: Number, required: true, unique:true},
    bookName:{type: String, required: true, unique:true},
    authorName:{type: String, required: true},
    buyLink:{type: String, required: true},
});
const Books = mongoose.model("Books", booksSchema);
module.exports = Books;

Books.create(
    {
        bookNum: "1",
        bookName: "The Return of the King",
        authorName: "J. R. R. Tolkien",
        buyLink: "https://www.amazon.ca/Return-King-Lord-Rings-Book/dp/0261102370/ref=sr_1_2?crid=1MIALU1B1YAUF"
    },
    {
        bookNum: "2",
        bookName: "Harry Potter and the Goblet of Fire",
        authorName: "J.K. Rowling",
        buyLink: "https://www.amazon.ca/Harry-Potter-Goblet-Fire-Rowling/dp/1408855682/ref=sr_1_8?crid=7FYRJZBVS562"
    },
    {
        bookNum: "3",
        bookName: "The Hunger Games",
        authorName: "Suzanne Collins",
        buyLink: "https://www.amazon.ca/Hunger-Games-Suzanne-Collins/dp/0439023521/ref=sr_1_3?crid=17C07PGRHOXQJ"
    },
    function (error, savedDocument) {
        if(error){
            if (error.name === 'MongoServerError' && error.code === 11000) {
                console.log('Records already exist in database');
            }
            else if (error) console.log(error);
        }
        else{
            console.log(savedDocument);
        }
        //
    }
);
