const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../user.model')
};