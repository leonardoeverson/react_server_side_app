try{
    mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
}catch(e){
    console.log(e)
}
