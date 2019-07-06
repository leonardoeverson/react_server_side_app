const express = require('express');
const router = express.Router();

let multer  = require('multer');
let upload = multer();

router.post('/login', upload.none(), (request, response)=>{
    console.log(request.body);
    response.send(JSON.stringify(request.body))
});

router.get('/nome', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

router.get('/endereco', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

router.get('/idade', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

module.exports = router;
