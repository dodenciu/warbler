const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/warbler", {
    keepAlive: true,
    useNewUrlParser: true,
});

mongoose.set('useCreateIndex', true);

module.exports.User = require("./user");