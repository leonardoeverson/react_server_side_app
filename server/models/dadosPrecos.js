const mongoose = require('../config/connection')();
const Schema = mongoose.Schema;

//User Schema
let dataPriceSchema = new Schema({
    name:String,
    address:String,
    district:String,
    flag:String,
    sale_price:String,
    purchase_price:String,
    provider:String,
    registration_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);