import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

export const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  if (!cart || cart.products.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const order = await Order.create({
    user: req.user.id,
    products: cart.products,
    total: cart.total,
    discountedTotal: cart.discountedTotal,
    status: "Pending",
  });

  // Optionally empty cart after order
  cart.products = [];
  cart.total = 0;
  cart.totalProducts = 0;
  cart.totalQuantity = 0;
  cart.discountedTotal = 0;
  await cart.save();

  res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

export const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Not found" });
  return res.json(order);
};

export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: "Not found" });
  res.json(order);
};
