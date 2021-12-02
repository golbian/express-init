const mongoose = require("mongoose");

mongoose.set('debug', true);

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB;
db.grid = require("./grid.model.js")(mongoose);
// db.user = require("./user.model.js")(mongoose);

module.exports = db;