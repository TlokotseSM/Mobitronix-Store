// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

// app.use(express.json()); // allows us to accept JSON data in the req.body

// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
// });
// }

// app.listen(PORT, () => {
// 	connectDB();
// 	console.log("Server started at http://localhost:" + PORT);
// });


//second version

// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import productRoutes from "./routes/product.route.js";
// import userRoutes from "./routes/user.route.js";
// import authRoutes from "./routes/auth.route.js";
// import cartRoutes from "./routes/cart.route.js";

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cookieParser());
// app.use(cors());

// app.use("/api/products", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/cart", cartRoutes);

// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server started at http://localhost:${PORT}`);
// });


//third version

import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
