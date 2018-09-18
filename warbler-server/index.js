require("dotenv").config();
const express = require("express");
const app = express();
const errorHandler = require("./handlers/error");

const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const PORT = 8081;

app.use(cors())
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);

app.use(function(req, res, next) {
    let err = new Error("Not found")
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
});