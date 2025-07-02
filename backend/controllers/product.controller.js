import Product from "../models/product.model";

export const getProducts = async (req,res) => {
    
    try {
        const products = await Product.find({});
        res.status(200).json({success:true, data:products});
    } catch (error) {
        console.error("Error in fetching products:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
}