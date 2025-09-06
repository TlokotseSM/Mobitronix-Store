import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate("products.product");
  if (!cart) return res.json({ products: [], total: 0 });
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(400).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      products: [{ product: productId, quantity, price: product.price }],
      totalProducts: 1,
      totalQuantity: quantity,
      total: product.price * quantity,
      discountedTotal: product.price * quantity * (1 - (product.discountPercentage || 0) / 100),
    });
  } else {
    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (itemIndex > -1) {
      cart.products[itemIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity, price: product.price });
    }
    cart.totalProducts = cart.products.length;
    cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
    cart.total = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    cart.discountedTotal = cart.products.reduce((sum, p) => {
      const prod = product;
      return sum + p.price * p.quantity * (1 - (prod.discountPercentage || 0) / 100);
    }, 0);
  }

  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;
  let cart = await Cart.findOne({ user: req.user.id });
  if (!cart) return res.status(400).json({ message: "Cart not found" });

  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  cart.totalProducts = cart.products.length;
  cart.totalQuantity = cart.products.reduce((sum, p) => sum + p.quantity, 0);
  cart.total = cart.products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  cart.discountedTotal = cart.products.reduce((sum, p) => {
    const prod = p.product;
    return sum + p.price * p.quantity * (1 - (prod.discountPercentage || 0) / 100);
  }, 0);

  await cart.save();
  res.json(cart);
};
