const express = require('express');
const router = express();

//For multipart/form-data
let multer  = require('multer');
let upload = multer();

router.post('/login', upload.none(), (request, response)=>{
    const login = require('../controllers/login');
    login.login_usuario(router, request, response);
});

router.post('/cadastro', upload.none(), (request, response)=>{
    const cadastro = require('../controllers/cadastro');
    cadastro.cadastro_usuario(router, request, response);
});

router.get('/dados', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

module.exports = router;
