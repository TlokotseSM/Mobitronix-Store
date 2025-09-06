import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number,
    discountPercentage: Number,
    total: Number,
    discountedTotal: Number
  }],
  total: Number,
  discountedTotal: Number,
  status: { type: String, default: "Pending" }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
