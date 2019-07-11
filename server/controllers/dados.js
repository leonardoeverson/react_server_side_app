module.exports.importa_dados = (app, request, response) => {
    const multer = require('multer');
    const dir = './uploads/';
    const fs = require('path');
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
            //
            
            //const csv = require('csv-parser');

            //Carrega modelo de dados
            const dataPrice = require('../models/dadosPrecos')
            
            response.sendStatus(200)
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