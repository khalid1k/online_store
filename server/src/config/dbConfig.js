import mongoose from 'mongoose';
const connectDb = async()=> {
    try{
       await mongoose.connect(process.env.DB_URL);
        console.log("database is connected");
    }catch(error){
        console.log(`Error while connecting to database ${error}`)
    }
    
}

export default connectDb;