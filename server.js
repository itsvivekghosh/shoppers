if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

// All Important Imports
const express = require("express");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(methodOverride("_method"));
app.set("layout", "layouts/layout");

app.use(expressLayout);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//Importing all Imports
const homeRouter = require("./routes/home");
const customerRouter = require("./routes/customer");

//Database Connectivity
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Database Connected to MyLibrary!"))
  .catch(err => {
    console.log(err);
  });

app.use("/", homeRouter);
app.use("/customer", customerRouter);

app.listen(process.env.PORT || 3000);
