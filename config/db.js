import mongoose from "mongoose";


const dbConnect = async() =>{

    try {
        const connection = await mongoose.connect(process.env.MONGO);
        const url =  `${connection.connection.host}:${connection.connection.host}`;
        console.log(`Mongo DB connected to: ${url}`); 

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect