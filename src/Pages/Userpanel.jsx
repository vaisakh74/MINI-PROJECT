

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
    const [products, setProducts] = useState(ALL_PRODUCT);
    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch();
    const cart = useSelector((s) => s.cart);
    const user = getCurrentUser();

    useEffect(() => {
        // setProducts(getProducts());
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




const ALL_PRODUCT = [
    {
        "id": 1,
        "name": "Margherita Pizza",
        "price": 299,
        "stock": 10
    },
    {
        "id": 2,
        "name": "Veg Burger",
        "price": 149,
        "stock": 15
    },
    {
        "id": 3,
        "name": "Pasta Alfredo",
        "price": 249,
        "stock": 8
    },
    {
        "id": 4,
        "name": "French Fries",
        "price": 99,
        "stock": 25
    },
    {
        "id": 5,
        "name": "Chocolate Shake",
        "price": 179,
        "stock": 12
    },
    {
        "id": 6,
        "name": "Grilled Sandwich",
        "price": 129,
        "stock": 20
    },
    {
        "id": 7,
        "name": "Paneer Tikka",
        "price": 299,
        "stock": 10
    },
    {
        "id": 8,
        "name": "Chicken Biryani",
        "price": 349,
        "stock": 8
    },
    {
        "id": 9,
        "name": "Veg Biryani",
        "price": 299,
        "stock": 10
    },
    {
        "id": 10,
        "name": "Caesar Salad",
        "price": 199,
        "stock": 14
    },
    {
        "id": 11,
        "name": "Tandoori Roti",
        "price": 25,
        "stock": 50
    },
    {
        "id": 12,
        "name": "Butter Naan",
        "price": 35,
        "stock": 40
    },
    {
        "id": 13,
        "name": "Dal Makhani",
        "price": 249,
        "stock": 12
    },
    {
        "id": 14,
        "name": "Butter Chicken",
        "price": 379,
        "stock": 10
    },
    {
        "id": 15,
        "name": "Masala Dosa",
        "price": 129,
        "stock": 18
    },
    {
        "id": 16,
        "name": "Idli Sambar",
        "price": 99,
        "stock": 20
    },
    {
        "id": 17,
        "name": "Veg Fried Rice",
        "price": 179,
        "stock": 15
    },
    {
        "id": 18,
        "name": "Chicken Fried Rice",
        "price": 219,
        "stock": 12
    },
    {
        "id": 19,
        "name": "Spring Rolls",
        "price": 149,
        "stock": 16
    },
    {
        "id": 20,
        "name": "Brownie with Ice Cream",
        "price": 199,
        "stock": 10
    }
]


