import express from 'express';
import dbConnect from './config/db.js';

const app = express();

dbConnect();

app.listen(3000, ()=>{
    console.log('conected to port 3000');
});
