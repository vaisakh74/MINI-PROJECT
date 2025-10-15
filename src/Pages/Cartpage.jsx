// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeItem, clearCart } from "../Store/index";
import { getProducts, saveProducts } from "../Utils/Product";
import { getCurrentUser } from "../Utils/Auth";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const cart = useSelector((s) => s.cart);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    const products = getProducts();
    const currentUser = getCurrentUser();

    const total = cart.items.reduce((acc, it) => acc + it.qty * it.price, 0);

    function handleQtyChange(productId, qty) {
        const prod = products.find((p) => p.id === productId);
        if (!prod) return;
        if (qty > prod.stock) {
            setMsg({ type: "error", text: "Quantity exceeds available stock" });
            return;
        }
        dispatch({ type: "cart/updateQty", payload: { productId, qty } });
    }

    function handleRemove(productId) {
        dispatch({ type: "cart/removeItem", payload: productId });
    }

    function handleCheckout() {
        if (cart.items.length === 0) {
            setMsg({ type: "error", text: "Cart is empty" });
            return;
        }

        const prods = products.map((p) => {
            const it = cart.items.find((ci) => ci.productId === p.id);
            if (it) {
                return { ...p, stock: p.stock - it.qty };
            }
            return p;
        });
        saveProducts(prods);
        dispatch({ type: "cart/clearCart" });
        setMsg({ type: "success", text: "Order placed successfully!" });

        setTimeout(() => navigate("/user-panel"), 1000);
    }

    return (
        <div className="page container">
            <h2>Your Cart</h2>
            {msg && <div className={msg.type === "error" ? "msg error" : "msg success"}>{msg.text}</div>}
            <div>
                {cart.items.length === 0 && <p>Cart is empty</p>}
                {cart.items.map((it) => (
                    <div key={it.productId} className="cart-item">
                        <div>
                            <strong>{it.name}</strong>
                            <div>Price: ₹{it.price}</div>
                        </div>
                        <div>
                            <input
                                type="number"
                                min="1"
                                value={it.qty}
                                onChange={(e) => handleQtyChange(it.productId, Number(e.target.value))}
                            />
                            <button onClick={() => handleRemove(it.productId)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="cart-total">
                <h3>Total: ₹{total}</h3>
                <button onClick={handleCheckout}>Checkout</button>
                <button onClick={() => dispatch({ type: "cart/clearCart" })}>Clear Cart</button>
            </div>
        </div>
    );
}
