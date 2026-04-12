import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export let cartContext = createContext();

export function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null);
    const [cartNumber, setCartNumber] = useState(0);

    
    const getHeaders = () => ({
        token: localStorage.getItem('userToken')
    });

    async function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, 
            { productId }, 
            { headers: getHeaders() }
        ).then((res) => {
            if (res.data.status === "success") {
                setCartNumber(res.data.numOfCartItems);
            }
            return res;
        }).catch((err) => err);
    }

    async function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
        .then((res) => {
            if (res.data) {
                setCartId(res.data.data._id);
                setCartNumber(res.data.numOfCartItems);
            }
            return res;
        }).catch((err) => err);
    }

    async function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers: getHeaders() })
        .then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    async function updateProductCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            { count }, { headers: getHeaders() }
        ).then((res) => {
            setCartNumber(res.data.numOfCartItems);
            return res;
        }).catch((err) => err);
    }

    async function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() })
        .then((res) => {
            setCartNumber(0);
            return res;
        }).catch((err) => err);
    }

    async function onlinePayment(cartId, shippingAddress) {
        return axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress }, 
            { headers: getHeaders() }
        ).then((res) => res).catch((err) => err);
    }

    async function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, 
            { productId }, { headers: getHeaders() }
        ).then((res) => res).catch((err) => err);
    }

    async function getLoggedWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: getHeaders() })
        .then((res) => res).catch((err) => err);
    }

    async function removeItemFromWishlist(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: getHeaders() })
        .then((res) => res).catch((err) => err);
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            getLoggedUserCart();
        }
    }, []);

    return (
        <cartContext.Provider value={{ 
            cartId, 
            cartNumber, 
            setCartNumber,
            onlinePayment,
            addToCart, 
            getLoggedUserCart, 
            removeItem, 
            updateProductCount, 
            clearCart,
            addToWishlist, 
            getLoggedWishlist, 
            removeItemFromWishlist 
        }}>
            {props.children}
        </cartContext.Provider>
    );
}