
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../Utils/Auth";

const currentUser = getCurrentUser();
const CART_KEY = currentUser ? `foody_cart_${currentUser.email}` : "foody_cart_guest";

function loadCart() {
    try {
        const raw = localStorage.getItem(CART_KEY);
        return raw ? JSON.parse(raw) : { items: [] };
    } catch {
        return { items: [] };
    }
}

const cartSlice = createSlice({
    name: "cart",
    initialState: loadCart(),
    reducers: {
        addItem(state, action) {

            const p = action.payload;
            const exists = state.items.find((i) => i.productId === p.productId);
            if (exists) {
                exists.qty += p.qty;
                if (exists.qty > p.stock) exists.qty = p.stock;
            } else {
                state.items.push({ ...p });
            }
        },
        updateQty(state, action) {

            const it = state.items.find((i) => i.productId === action.payload.productId);
            if (it) it.qty = action.payload.qty;
        },
        removeItem(state, action) {
            state.items = state.items.filter((i) => i.productId !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        },
        setCartForUser(state, action) {

            state.items = action.payload.items || [];
        }
    }
});

export const { addItem, updateQty, removeItem, clearCart, setCartForUser } = cartSlice.actions;

const store = configureStore({
    reducer: { cart: cartSlice.reducer }
});


store.subscribe(() => {
    try {
        const curUser = getCurrentUser();
        const key = curUser ? `foody_cart_${curUser.email}` : "foody_cart_guest";
        localStorage.setItem(key, JSON.stringify(store.getState().cart));
    } catch (e) {

    }
});

export default store;
