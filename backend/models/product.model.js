// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     price:{
//         type: Number,
//         required: true
//     },
//     image:{
//         type: String,
//         required: true
//     },
// }, {
//     timestamps: true //createdAt, UpdatedAt
// });

// //product model

// const Product = mongoose.model('Product', productSchema);

// export default Product;


import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  availabilityStatus: { type: String, default: "In Stock" },
  reviews: [ { user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, comment: String, rating: Number } ],
  returnPolicy: String,
  images: [String],
  thumbnail: String,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
