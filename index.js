import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
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
        if(!origin){//for bypassing postman req with  no origin
            return callback(null, true);
        }

        if (whiteList.includes(origin)) {
            callback(null, true);
        }else{
            callback(new Error('Cors Error'));
        }
    }
}

app.use(cors(corsOptions));



//cookies
app.use(cookieParser());

//routing
app.use('/api/auth', authRoutes )
app.use('/api/users', userRoutes);


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


