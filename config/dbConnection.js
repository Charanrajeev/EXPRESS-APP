const mongoose = require("mongoose");


const connectDb = async()=>{
    try{
    const connect = await mongoose.mongoose.connect(process.env.CONNECTION_STRING);
    
    console.log(`Data base Connected `);
    }
    catch(err){
        console.log("error",err);
        process.exit(1);

    }
}
module.exports = connectDb;