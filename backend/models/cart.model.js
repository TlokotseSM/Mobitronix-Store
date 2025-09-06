import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
  totalProducts: Number,
  totalQuantity: Number
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
