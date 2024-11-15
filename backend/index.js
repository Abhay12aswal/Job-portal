import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import userRoute from "./routes/user.js";
import companyRoute from "./routes/company.js";
import errorMiddleware from "./middleware/error.js";


dotenv.config({});

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


const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute)

//middleware for error  
app.use(errorMiddleware)

app.listen(PORT , ()=>{
    console.log(`server running at PORT ${PORT}`)
})