module.exports.importa_dados = (app, request, response) => {
    const multer = require('multer');
    const dir = './uploads/';
    let filename;

    //Multer
    const upload = multer({}).single('file');

    upload(request, response, (err) => {
        if (err) {
            console.log(err)
        } else {
            //
            const fs = require('fs');
            const csv = require('csv-parser');

            //Carrega modelo de dados
            const dataPrice = require('../models/dadosPrecos')
            
            fs.writeFile(dir + request.file.originalname, request.file.buffer,(err, result)=>{
                if(!err){
                    console.log('ok');
                }
            })

            //Lê o arquivo csv
            // fs.createReadStream(request.file)
            //     .pipe(csv())
            //     .on('data', (data) => {
            //         try {
            //             //perform the operation
            //             console.log(data)
            //         }
            //         catch (err) {
            //             //error handler
            //         }
            //     })
            //     .on('end', () => {
            //         //some final operation
            //     });
        }
    })
}