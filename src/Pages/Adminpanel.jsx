
import React, { useEffect, useState } from "react";
import { getProducts, addProduct, saveProducts } from "../Utils/Product";

export default function AdminPanel() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: "", price: "", stock: "" });
    const [msg, setMsg] = useState(null);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    function handleChange(e) {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    }

    function handleAdd(e) {
        e.preventDefault();
        const { name, price, stock } = form;
        if (!name || !price || !stock) {
            setMsg({ type: "error", text: "Provide all fields" });
            return;
        }
        addProduct({ name, price, stock });
        const updated = getProducts();
        setProducts(updated);
        setForm({ name: "", price: "", stock: "" });
        setMsg({ type: "success", text: "Product added" });
    }

    function handleStockChange(id, delta) {
        const p = products.map((prod) =>
            prod.id === id ? { ...prod, stock: Math.max(0, prod.stock + delta) } : prod
        );
        saveProducts(p);
        setProducts(p);
    }

    return (
        <div className="page container">
            <h2>Admin Panel - Manage Products</h2>
            {msg && <div className={msg.type === "error" ? "msg error" : "msg success"}>{msg.text}</div>}

            <form className="form-inline" onSubmit={handleAdd}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
                <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
                <button type="submit">Add Product</button>
            </form>

            <div className="product-grid">
                {products.length === 0 && <p>No products yet</p>}
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <h4>{p.name}</h4>
                        <p>Price: ₹{p.price}</p>
                        <p>Stock: {p.stock}</p>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => handleStockChange(p.id, 1)}>+1</button>
                            <button onClick={() => handleStockChange(p.id, -1)}>-1</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
