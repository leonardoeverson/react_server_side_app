module.exports.login_usuario = (app, request, response)=>{

    const bcrypt = require('bcrypt');

    //Body
    let body = request.body;

    //User Model
    let User = require('../models/cadastro');

    User.find({email: body.email},(err, docs)=>{
        if(!err){
            if(docs.length > 0){
                bcrypt.compare(body.password, docs[0].password, (err, result)=>{
                    if(result){
                        request.session.logged = 'true';
                        response.status(200).json({'mensagem':'ok'});
                    }else{
                        console.log(err)
                    }
                })
            }
        }
    })
};
