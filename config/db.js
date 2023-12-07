import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async() =>{

    try {
        const connection = await mongoose.connect('mongodb+srv://jsjosgiovani:totonicapan@mern-estate.vfdudtk.mongodb.net/?retryWrites=true&w=majority');

        const url =  `${connection.connection.host}:${connection.connection.host}`;
        console.log(`mongo DB connected to: ${url}`); 

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect