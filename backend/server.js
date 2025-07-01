import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';


dotenv.config();

const app = express();

app.use(express.json()); //allows us to accept json data in the req.body

app.post("/api/products", async (req,res) => {
    const product = req.body; //user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message: "Please provide all fields"});
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.error("Error in Creating product:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
});

//


app.listen(5000, () => {
    connectDB();
    console.log('Server Started at http://localhost:5000')
});



//password: ZqU3z4qriV23kTwj

//mongodb+srv://tlokotsemogudi:ZqU3z4qriV23kTwj@cluster0.4xheq9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0