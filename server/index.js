const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')

try{
    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
}catch(e){
    console.log(e)
}


nextApp.prepare().then(() => {
    // express code here
    const app = express()
})

nextApp.prepare().then(() => {
    // express code here
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('*', (req,res) => {
        return handle(req,res) // for all the react stuff
    })

    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    })
}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});