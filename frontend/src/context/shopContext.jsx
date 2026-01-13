import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const shopContext = createContext()



export const ShopContextProvider = ({ children }) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState("");
    const navigate = useNavigate()


    const addToCart = async (itemId, size) => {

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
        if(token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: {token}})
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        } 
    }

    const getCartCount = () => {
        return Object.values(cartItems).reduce((acc, curr) => acc + Object.values(curr).reduce((acc, curr) => acc + curr, 0), 0)
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: {token}})
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find(product => product._id === items);
            console.log('itemInfo: ',itemInfo)
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


    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list', {headers: {contentType: 'application/json'}})
            const { success, message, products } = response.data
            if(success) {
                setProducts(products)
            } else {
                toast.error(message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        if(token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/get',{}, { headers: {token}})
                const { success, message, cartData } = response.data
                if(success) {
                    setCartItems(cartData)
                } else {
                    toast.error(message)
                }
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [token])

    const value = {
        products,
        currency,
        delivery_fee,
        cartItems,
        search,
        showSearch,
        backendUrl,
        token,
        navigate,
        setCartItems,
        setToken,
        getProductsData,
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