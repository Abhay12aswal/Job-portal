import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDatabase from './config/database.js';
import userRoute from "./routes/user.js";
import companyRoute from "./routes/company.js";
import jobRoute from "./routes/job.js";
import applicationRoute from "./routes/application.js";
import errorMiddleware from "./middleware/error.js";
import path from 'path';

dotenv.config({});

const app= express();
const PORT = process.env.PORT || 3000;

const _dirname= path.resolve();

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const corsOptions = {
    origin: "https://job-portal-3epv.onrender.com/", // Corrected colon
    credentials: true
};
app.use(cors(corsOptions));


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute)

//middleware for error  
app.use(errorMiddleware)
app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*",(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})

app.listen(PORT , ()=>{
    console.log(`server running at PORT ${PORT}`)
})