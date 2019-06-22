const next = require('next');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
}catch(e){
    console.log(e)
}


nextApp.prepare().then(() => {

    const server = require('./config/express_config');

    server.get('*', (req,res) => {
        return handle(req,res)
    });

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    })

}).catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});
