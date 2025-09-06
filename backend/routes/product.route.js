// import express from "express";

// import {getProducts, createProduct, updateProduct, deleteProduct} from "../controllers/product.controller.js"

// const router = express.Router();

// router.get("/", getProducts);

// router.post("/", createProduct);

// router.put("/:id", updateProduct);

// router.delete("/:id", deleteProduct);

// export default router;

import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { permit } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

router.post("/", protect, permit("admin", "vendor"), createProduct);
router.put("/:id", protect, permit("admin", "vendor"), updateProduct);
router.delete("/:id", protect, permit("admin", "vendor"), deleteProduct);

export default router;
