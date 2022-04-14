const Books = require("../models/bookModels");

exports.sendReqParam = (req, res) => {
    let path = req.url;
    if (path == '/home'){
        Books.find( {}, (error, books) => {
            if (!error) {
                res.render("home", {data: books});
            } else {
                console.log('ERROR' + error);
            }
        });
    }
    else if (path == '/a2'){
        res.sendFile(`./public/css/${path}.css`, {
            root: "./"
        })
    }
    else if (path == '/DeleteABook'){
        Books.find( {}, (error, books) => {
            if (!error) {
                res.render("deleteBook", {data: books});
            } else {
                console.log('ERROR' + error);
            }
        });
    }
    else if (path == '/AddNewBook'){
        res.render('addBook', {book: new Books()});
    }
    else if (path == '/test'){
        res.sendFile(`./public/js/${path}.js`, {
            root: "./"
        })
    }
};
exports.respondWithBook = (req, res) => {
    let bookNumber = req.params.bookNumber;
    Books.find( {}, (error, data) => {
        if (data) res.render(bookNumber, {data: data[bookNumber-1]});
    });
};

const httpStatus = require("http-status-codes");
exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode} | The page does not exist!`);
};
exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.send(`${errorCode} | Sorry, our application is experiencing a problem!`)
};
