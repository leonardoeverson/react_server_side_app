module.exports.cadastro_usuario = (app, request, response) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    //Body
    let body = request.body;

    //User Model
    let User = require('../models/cadastro');

    //Senhas
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password, salt, function(err, hash) {
            // Store hash in your password DB.
            try{
                let Usuario = new User({name: body.name, email: body.email, password: hash });
                Usuario.save((err)=>{
                    if(err){
                        console.log(err);
                        response.send(500)
                    }
                })

                response.send(200)
            }catch (e) {
                console.log(e)
                response.send(500)
            }


        });
    });
};
