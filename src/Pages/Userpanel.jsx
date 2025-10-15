
import React, { useEffect, useState } from "react";
import { getProducts } from "../Utils/Product";
import { useDispatch } from "react-redux";
import { addItem } from "../Store/index";
import { addItem as addItemAction } from "../Store/index";
import { addItem as addItemRedux } from "../Store/index";

// Importing actual redux action:
import { addItem as addItemToCart } from "../Store/index";

import { useSelector } from "react-redux";
import { getCurrentUser } from "../Utils/Auth";

export default function UserPanel() {
    const [products, setProducts] = useState([]);
    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector((s) => s.cart);
    const user = getCurrentUser();

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    function handleAddToCart(p, qty = 1) {
        // check stock vs existing qty in cart
        const inCart = cart.items.find((it) => it.productId === p.id);
        const existingQty = inCart ? inCart.qty : 0;
        if (existingQty + qty > p.stock) {
            setMsg({ type: "error", text: "Cannot add more than available stock" });
            return;
        }

        dispatch({
            type: "cart/addItem",
            payload: {
                productId: p.id,
                name: p.name,
                price: p.price,
                qty,
                stock: p.stock
            }
        });
        setMsg({ type: "success", text: "Added to cart" });
    }

    return (
        <div className="page container">
            <h2>Products</h2>
            {msg && <div className={msg.type === "error" ? "msg error" : "msg success"}>{msg.text}</div>}

            <div className="product-grid">
                {products.map((p) => (
                    <div key={p.id} className="product-card">
                        <h4>{p.name}</h4>
                        <p>Price: ₹{p.price}</p>
                        <p>Stock: {p.stock}</p>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => handleAddToCart(p, 1)}>Add +1</button>
                            <button onClick={() => handleAddToCart(p, 2)}>Add +2</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
