import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js"

const router = express.Router();

router.get("/", getProducts);

router.post("/", async (req,res) => {
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

router.put("/:id", async (req, res) =>{
    const {id} = req.params;

    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({success:false, message:"Invalid Product Id"});
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success:true, data:updatedProduct});
    } catch (error) {
        // console.error("Error in updating product:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
})

router.delete("/:id", async (req, res) =>{
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true, message: "Product Deleted"});
    } catch (error) {
        console.error("Error in deleting product:", error.message);
        res.status(404).json({success:false, message: "Product Not Found"});
    }
})

export default router;