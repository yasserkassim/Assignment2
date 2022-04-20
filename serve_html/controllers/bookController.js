const Books = require("../models/bookModels");

module.exports = {
    index: (req, res) => {
        Books.find({}).then(books => {
            res.render("home", {
                book: books
            });
        })
        .catch(error => {
            console.log(`Error fetch books: ${error.message}`)
            res.redirect("/home");
        });
    },
    new: (req, res) => {
        res.render("addBook");
    },
    create: (req, res, next) => {
        let bookParams = {
            bookName:req.body.bookName,
            authorName:req.body.authorName,
            buyLink:req.body.buyLink
        };
        Books.create(bookParams).then(books => {
            res.locals.redirect = "/home";
            res.locals.books = books;
            next();
        })
        .catch(error => {
            console.log(`Error saving books: ${error.message}`);
            next(error);
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    delete: (req, res, next) => {
        let book = req.params.bookName;
        Books.findOneAndDelete({bookName:book}).then(() => {
            res.locals.redirect = "/home";
            next();
        })
        .catch(error => {
            console.log(`Error deleting book by Book Name: ${error.message}`);
            next();
        });
    }
}
