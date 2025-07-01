import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();

app.get("/products", (req,res) => {
    // res.send("Server is ready");
})



app.listen(5000, () => {
    connectDB();
    console.log('Server Started at http://localhost:5000')
})



//password: ZqU3z4qriV23kTwj

//mongodb+srv://tlokotsemogudi:ZqU3z4qriV23kTwj@cluster0.4xheq9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0