module.exports.cadastro_usuario = (app, request, response) => {

    const mongoose = require('../config/connection')();
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    let body = request.body;
    let Schema = mongoose.Schema;

    //User Schema
    let usuarioSchema = new Schema({
        name:String,
        email:String,
        password:String,
        registration_date:{ type: Date, default: Date.now }
    });

    //Model
    let Usuario = new mongoose.model('Usuario', usuarioSchema);

    //Senhas
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            let user = new Usuario({name: body.name, email: body.email, password: hash })
        });
    });
};
