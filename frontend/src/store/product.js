// import { create } from "zustand";

// export const useProductStore = create((set) => ({
// 	products: [],
// 	setProducts: (products) => set({ products }),
// 	createProduct: async (newProduct) => {
// 		if (!newProduct.name || !newProduct.image || !newProduct.price) {
// 			return { success: false, message: "Please fill in all fields." };
// 		}
// 		const res = await fetch("/api/products", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(newProduct),
// 		});
// 		const data = await res.json();
// 		set((state) => ({ products: [...state.products, data.data] }));
// 		return { success: true, message: "Product created successfully" };
// 	},
// 	fetchProducts: async () => {
// 		const res = await fetch("/api/products");
// 		const data = await res.json();
// 		set({ products: data.data });
// 	},
// 	deleteProduct: async (pid) => {
// 		const res = await fetch(`/api/products/${pid}`, {
// 			method: "DELETE",
// 		});
// 		const data = await res.json();
// 		if (!data.success) return { success: false, message: data.message };

// 		// update the ui immediately, without needing a refresh
// 		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
// 		return { success: true, message: data.message };
// 	},
// 	updateProduct: async (pid, updatedProduct) => {
// 		const res = await fetch(`/api/products/${pid}`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(updatedProduct),
// 		});
// 		const data = await res.json();
// 		if (!data.success) return { success: false, message: data.message };

// 		// update the ui immediately, without needing a refresh
// 		set((state) => ({
// 			products: state.products.map((product) => (product._id === pid ? data.data : product)),
// 		}));

// 		return { success: true, message: data.message };
// 	},
// }));


import { create } from 'zustand';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProduct
} from '../api/api';

export const useProductStore = create((set, get) => ({
  products: [],
  selectedProduct: null,
  fetchProducts: async () => {
    const data = await fetchProducts();
    set({ products: data });
  },
  fetchProduct: async (id) => {
    const product = await fetchProduct(id);
    set({ selectedProduct: product });
  },
  createProduct: async (product, token) => {
    const res = await createProduct(product, token);
    if (res) set((state) => ({ products: [...state.products, res] }));
    return res;
  },
  updateProduct: async (id, product, token) => {
    const res = await updateProduct(id, product, token);
    set((state) => ({
      products: state.products.map((p) => (p._id === id ? res : p)),
    }));
    return res;
  },
  deleteProduct: async (id, token) => {
    const res = await deleteProduct(id, token);
    set((state) => ({
      products: state.products.filter((p) => p._id !== id),
    }));
    return res;
  },
}));
