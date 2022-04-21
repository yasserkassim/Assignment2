const Books = require("../models/bookModels");

module.exports = {
    index: (req, res) => {
        Books.find({}).then(books => {
            res.render("home", {
                data: books
            });

        })
            .catch(error => {
                console.log(`Error fetch books: ${error.message}`)
                res.redirect("/home");
            });
    },
    bookPages: (req, res) => {
        console.log(req.params.bookNumber);
        Books.findOne({ bookNum: req.params.bookNumber }).then((books) => {
            res.render("books", {
                data: books
            });
            console.log(books);
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
        Books.countDocuments({}, function (err, count) {
            if (count) {
                let bookParams = {
                    bookNum: count + 1,
                    bookName: req.body.bookName,
                    authorName: req.body.authorName,
                    buyLink: req.body.buyLink
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
            }
        });
    },
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath) res.redirect(redirectPath);
        else next();
    },
    delete: (req, res, next) => {
        let book = req.params.bookName;
        Books.findOneAndDelete({ bookName: book }).then(() => {
            res.locals.redirect = "/home";
            next();
        })
            .catch(error => {
                console.log(`Error deleting book by Book Name: ${error.message}`);
                next();
            });
    },
    deleteBook: (req, res) => {
        Books.find({}).then(books => {
            res.render("deleteBook", {
                data: books
            });
        })
            .catch(error => {
                console.log(`Error fetch books: ${error.message}`)
                res.redirect("/home");
            });
    },
    returnCss: (req, res) => {
        res.sendFile(`./public/css/${req.url}.css`, {
            root: "./"
        });
    }
}
