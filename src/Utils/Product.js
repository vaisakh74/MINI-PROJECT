// src/utils/products.js
const PRODUCTS_KEY = "foody_products";

export function getProducts() {
    try {
        const raw = localStorage.getItem(PRODUCTS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export function addProduct({ name, price, stock }) {
    const products = getProducts();
    const product = {
        id: Date.now(),
        name,
        price: Number(price),
        stock: Number(stock)
    };
    products.unshift(product);
    saveProducts(products);
    return product;
}
