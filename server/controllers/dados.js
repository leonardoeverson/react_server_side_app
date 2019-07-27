module.exports.importa_dados = (app, request, response) => {
    const multer = require('multer');
    const dir = './uploads/';
    const fs = require('path');
    const xlsx = require('node-xlsx');

    let filename;
    //Multer
    const upload = multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, dir)
            },
            filename: function (req, file, cb) {
                filename = file.fieldname + '-' + Date.now() + fs.extname(file.originalname)
                cb(null, filename)
            }
        })
    }).single('file');

    upload(request, response, (err) => {
        if (err) {
            console.log(err)
        } else {
            
            let tipo = request.body.tipo;

            //Carrega modelo de dados
            const registroPrecos = require('../models/dadosPrecos');
            const historicoPrecos = require('../models/historicoPrecos')

            //Faz a Leitura do Arquivo
            let arquivo_dados = xlsx.parse(dir + filename);

            //To-do
            /*
                1 - Verificar se existe dados pra data
                2 - Reconhecer o tipo de combustível inserido
                3 - Verificar se já existe do posto para aquele data
                4 - Se existe, atualizar os dados
            */
            let historicoPrecosDB = new historicoPrecos({
                city: arquivo_dados[0].data[4][0],
                fuel:arquivo_dados[0].data[5][0],
                period:arquivo_dados[0].data[6][0],
            })

            historicoPrecosDB.save((err)=>{
                if(err){
                    console.log(err)
                    response.status(500).json({error:'Houve um erro ao atualizar os dados'})
                }
            })

            historicoPrecosDB.collection.drop();
            registroPrecos.collection.drop();


            for(let i = 11; i < 112;i++){
                
                let registroPrecosDB;
                let data = new Date(1900, 0, Number(arquivo_dados[0].data[i][8]) - 1);
                data = data.getDate() + "/" + (data.getMonth() + 1 ) + "/" + data.getFullYear();

                if(tipo == 1){
                    registroPrecosDB = new registroPrecos({
                        name: arquivo_dados[0].data[i][0],
                        address:arquivo_dados[0].data[i][1],
                        district: arquivo_dados[0].data[i][2],
                        flag: arquivo_dados[0].data[i][3],
                        gs_sale_price: arquivo_dados[0].data[i][4],
                        gs_purchase_price: arquivo_dados[0].data[i][5],
                        provider: arquivo_dados[0].data[i][7],
                        period: arquivo_dados[0].data[6][0],
                        collection_date: data
                    })    
                }else{
                    registroPrecosDB = new registroPrecos({
                        name: arquivo_dados[0].data[i][0],
                        address:arquivo_dados[0].data[i][1],
                        district: arquivo_dados[0].data[i][2],
                        flag: arquivo_dados[0].data[i][3],
                        eth_sale_price: arquivo_dados[0].data[i][4],
                        eth_purchase_price: arquivo_dados[0].data[i][5],
                        provider: arquivo_dados[0].data[i][7],
                        collection_date: data
                    })
                }
                
                registroPrecosDB.save((err)=>{
                    if(err){
                        console.log(err)
                        response.status(500).json({error:'Houve um erro ao atualizar os dados'})
                    }
                })
            }
            
            response.status(200).json({msg:'Dados atualizados com sucesso'})
        }
    })
}

module.exports.recupera_dados = (app, request, response) => {
    const dataPrice = require('../models/dadosPrecos');
    let data = new Date();
    data = new Date(data.setDate(data.getDate() - 7));
    data = new Date(data.toISOString());

    let data2 = new Date();
    data2 = new Date(data2.toISOString());

    dataPrice.aggregate([
        {
            $match: {
                registration_date: {
                    $lte: data2,
                    $gte: data
                }
            }
        }

    ], (err, result) => {
        if(err){
            response.status(500).json({err})
        }else{
            response.status(200).json({result})
        }
        
    })
}