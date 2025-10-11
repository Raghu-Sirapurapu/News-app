const mongoose = require('mongoose')

const connectToDB = async()=>{
    try{
        await mongoose.connect(
            process.env.MONGODB_URI
        );
        console.log('mongodb connected successfully')
    }catch(err){
        console.log(`Connection to mongodb failed ${err}`);
        process.exit(1);
    }
}

module.exports = connectToDB