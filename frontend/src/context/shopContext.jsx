import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { products } from "../assets/assets"
import { toast } from 'react-toastify'
export const shopContext = createContext()



export const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId, size) => {
        if(!size) {
            toast.error('Please select product size')
            return
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, curr) => acc + Object.values(curr).reduce((acc, curr) => acc + curr, 0), 0)
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalAmount;
    }

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        search,
        showSearch,
        addToCart,
        getCartCount,
        updateQuantity,
        setSearch,
        setShowSearch,
        getCartAmount,
    }

    return (
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopContextProvider