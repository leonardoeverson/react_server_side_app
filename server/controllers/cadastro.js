module.exports.cadastro_usuario = (app, request, response) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    //Body
    let body = request.body;

    //User Model
    let User = require('../models/cadastro');

    //Verificar se o usuário existe
    User.find({name:body.name},(err, docs)=>{
        if(!err){
            if(docs.length > 0){
                response.status(500).json({'mensagem':'Já Existem um usuário com este e-mail'})
            }
        }else{
            throw new Error(err)
        }
    });

    //Senhas
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(body.password1, salt, function(err, hash) {
            // Store hash in your password DB.
            try{
                let Usuario = new User({name: body.name, email: body.email, password: hash });
                Usuario.save((err)=>{
                    if(err){
                        console.log(err);
                        response.status(500).json({'mensagem':'Houve um erro ao realizar a operação'})
                    }
                });

                response.status(200).json({'mensagem':'Cadastro realizado com sucesso'})
            }catch (e) {
                console.log(e);
                response.status(500).json({'mensagem':'Erro ao realizar a operação'})
            }


        });
    });
};
