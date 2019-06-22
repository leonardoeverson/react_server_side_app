'use strict'

let express = require('express');
let app = express();

app.get('/teste', (request, response)=>{
    response.send(JSON.stringify('teste'))
});

module.exports = app;
