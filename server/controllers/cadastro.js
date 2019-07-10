module.exports.cadastro_usuario = (app, request, response) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    //Body
    let body = request.body;

    //User Model
    let User = require('../models/cadastro');

    //Verificar se o usuário existe
    User.find({email:body.email},(err, docs)=>{
        if(!err){
            if(docs.length == 0){
                //Senhas
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(body.password1, salt, function(err, hash) {
                        // Store hash in your password DB.
                        try{
                            let Usuario = new User({name: body.name, email: body.email, password: hash });
                            Usuario.save((err)=>{
                                if(err){
                                    console.log(err);
                                    response.status(500).json({error:'Houve um erro ao realizar a operação'})
                                }else{
                                    response.status(200).json({'mensagem':'Cadastro realizado com sucesso'})
                                }
                            });

                        }catch (e) {
                            console.log(e);
                            response.status(500).json({error:'Erro ao realizar a operação'})
                        }
                    });
                });
            }else{
                response.status(500).json({error : 'Já existe uma conta para este e-mail'});
            }
        }else{
            console.log(err)
            response.status(500).json({error:'Erro ao realizar a operação'})
        }
    });


};
