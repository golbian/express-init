const mongoose = require("mongoose");

mongoose.set('debug', true);

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB;
db.reward = require("./reward.model.js")(mongoose);
db.collection = require("./collection.model.js")(mongoose);

module.exports = db;