import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';



const app = express();
app.use(express.json());

dotenv.config();

//connect to db
dbConnect();

//allow CORS Origins

const whiteList = [process.env.FRONT_END_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('Cors Error'));
        }
    }
}

app.use(cors(corsOptions));



//routing
app.use('/api/auth', authRoutes )
app.use('/api/users', userRoutes);



//start server
app.listen(3000, ()=>{
    console.log('conected to port 3000');
});
