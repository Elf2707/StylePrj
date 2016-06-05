/**
 * Created by Elf on 05.06.2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

var User = new Schema({
    local: {
        displayName: String,
        email: String,
        password: String,
        created: {type: Date, default: Date.now}
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        displayName: String
    }
});

User.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

User.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);

