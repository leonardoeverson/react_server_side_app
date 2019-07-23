const request = require('request');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let url = 'https://preco.anp.gov.br/include/Resumo_Semanal_Index.asp'
let params;


request({url:url, qs:params}, function(err, response, body) {
    if(err) { console.log(err); return; }
    console.log("Get response: " + body);
  });