const mongoose = require('mongoose');
const bookController = require('./controllers/bookController');
require("dotenv").config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

express = require("express"),
app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router = express.Router();
app.use("/", router);
router.get("/home", bookController.index);
router.get("/books/:bookNumber", bookController.bookPages);
router.get("/a2", bookController.returnCss);
router.get("/AddNewBook", bookController.new);
router.get("/DeleteABook", bookController.deleteBook);
router.post("/books/create", bookController.create, bookController.redirectView);
router.delete("/books/:bookName/delete", bookController.delete, bookController.redirectView);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});
app.use(express.json());

app.listen(app.get("port"), () => {
    console.log(`The Express.js server has started and is listening on port number: ${app.get("port")}`);
});
