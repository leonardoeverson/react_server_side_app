const mongoose = require('../config/connection')();
const Schema = mongoose.Schema;

//Schema dos Dados dos Postos
let registroPrecosSchema = new Schema({
    name:String,
    address:String,
    district:String,
    flag:String,
    gs_sale_price:String,
    gs_purchase_price:String,
    eth_sale_price:String,
    eth_purchase_price:String,
    provider:String,
    period:String,
    registration_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('registroPrecos', registroPrecosSchema);