import mongoose from "mongoose";


const connectToDatabase = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/test',{});
        console.log('Connected to MongoDB');
    }catch(error){
        console.error('Error connecting to MongoDB',error);
        process.exit(1);
    }
}

export default connectToDatabase;