const mongoose = require('mongoose');
const bookController = require('./controllers/bookController');
require("dotenv").config();
const uri = process.env.ATLAS_URI;
//console.log(uri);
mongoose.connect(uri, { useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const port = 3000,
    homeController = require("./controllers/homeController"),
    express = require("express"),
    app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/home", homeController.sendReqParam);
app.get("/DeleteABook", homeController.sendReqParam);
app.get("/AddNewBook", homeController.sendReqParam);
app.get("/books/:bookNumber", homeController.respondWithBook);
app.get("/a2", homeController.sendReqParam);
app.get("/test", homeController.sendReqParam);
//app.get("/", homeController.delete);
const bodyParser = require('body-parser');
const methodOverride = require("method-override");

app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

router = express.Router()
app.use("/", router)
router.get("/books/new", bookController.new);
router.post("/books/create", bookController.create, bookController.redirectView);
router.delete("/books/:bookName/delete", bookController.delete, bookController.redirectView);

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});
app.use(express.json());
app.use(homeController.respondNoResourceFound);
app.use(homeController.respondInternalError);

//app.post("/home", homeController.);

app.post("/", (req, res) => {
    // console.log(req.body);
    // console.log(req.query);
    res.send("POST Successful!");
});
app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
})