const mongoose = require('../config/connection')();
const Schema = mongoose.Schema;

//User Schema
let userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    registration_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
