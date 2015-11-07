var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_ENDPOINT);

module.exports = mongoose.connection;
