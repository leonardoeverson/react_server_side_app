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

            //Carrega modelo de dados
            const dataPrice = require('../models/dadosPrecos');
            let arquivo_dados = xlsx.parse(dir + filename);

            for(let i = 11; i < arquivo_dados[0].data.length;i++){
                
                let dataPriceDB = new dataPrice({
                    name: arquivo_dados[0].data[i][0],
                    address:arquivo_dados[0].data[i][1],
                    district: arquivo_dados[0].data[i][2],
                    flag: arquivo_dados[0].data[i][3],
                    sale_price: arquivo_dados[0].data[i][4],
                    purchase_price: arquivo_dados[0].data[i][5],
                    provider: arquivo_dados[0].data[i][6],
                    period: arquivo_dados[0].data[6][0]
                })

                dataPriceDB.save((err)=>{
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

module.exports.recupera_dados = (app, request, response){
    
}