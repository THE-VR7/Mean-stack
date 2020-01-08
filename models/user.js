var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportlocalmongoose = require('passport-local-mongoose');

var User = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});
User.plugin(passportlocalmongoose);
module.exports = mongoose.model('User',User);