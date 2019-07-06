'use strict'

let express = require('express');
let app = express();

app.post('/login', (request, response)=>{
    response.send(JSON.stringify(request.body))
});

app.get('/nome', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

app.get('/endereco', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

app.get('/idade', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

module.exports = app;
