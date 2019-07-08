module.exports = ()=>{
    let mongoose = require('mongoose');

    try{
        mongoose.connect('mongodb://localhost:27017/react_app', {useNewUrlParser: true});
    }catch(e){
        console.log(e)
    }

    return mongoose;
};
