import { createContext } from "react"
import { products } from "../assets/assets"
export const shopContext = createContext()

const currency = '$';
const delivery_fee = 10;

const value = {
    products,
    currency,
    delivery_fee,
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    clearCart: () => {},
    getCartTotal: () => {},
    getCartTotalItems: () => {},
}

export const ShopContextProvider = ({ children }) => {
    return (
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider