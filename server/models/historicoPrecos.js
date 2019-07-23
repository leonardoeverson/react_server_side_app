const mongoose = require('../config/connection')();
const Schema = mongoose.Schema;

//Schema dos Dados dos Postos
let historicoPrecosSchema = new Schema({
    period:String,
    city:String,
    fuel:String,
    registration_date:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('historicoPrecos', historicoPrecosSchema);