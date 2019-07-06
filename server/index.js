//Server Config
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== 'production';

//Next
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

    //Express
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
