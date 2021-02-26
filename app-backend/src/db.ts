import mongoose from 'mongoose';

const ConnectDB = async () => {

const url = "mongodb+srv://dimitar_hristoskov:TjaqcGWm4Lp0YItQ@cluster0.zovha.mongodb.net/virtualSchool?retryWrites=true&w=majority"

    try{
        await mongoose.connect(url, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
        console.log('Connected to MongoDB successfuly!')
    }catch(err){
        console.error(err.message);
        process.exit(1);
    }
}

export default ConnectDB;