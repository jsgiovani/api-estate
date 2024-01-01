import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dbConnect from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import propertyRoutes from './routes/propertyRoutes.js';
import { search } from './controllers/PropertyController.js';

const app = express();
app.use(express.json());

dotenv.config();


//cookies
app.use(cookieParser());


//connect to db
dbConnect();


//allow CORS Origins
const whiteList = [process.env.FRONT_END_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(!origin){//for bypassing postman req with  no origin
            return callback(null, true);
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('Cors Error'));
        }
    },
    credentials:true,
}


app.use(cors(corsOptions));
app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
}))


//routing
app.use('/api/auth', authRoutes )
app.use('/api/users', userRoutes);
app.use('/api/search', search);
app.use('/api/properties', propertyRoutes);


app.use((err, req, res, next) =>{
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});


//start server
app.listen(3000, ()=>{
    console.log('conected to port 3000');
});


