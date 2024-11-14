import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';


dotenv.config({ path: './config/config.env' });

const app= express();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: "http//localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

const port= 3000;

app.listen(port , ()=>{
    console.log(`server running at port ${port}`)
})