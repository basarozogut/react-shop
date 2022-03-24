import { useContext, useEffect } from 'react';
import { CartContext } from '../context/cartContext';

export default function useCart() {
    const { cartItems, setCartItems, currency, cartStateLoaded, setCartStateLoaded } = useContext(CartContext);

    useEffect(() => {
        if (!cartStateLoaded && localStorage.getItem("cart")) {
            const deserialized = JSON.parse(localStorage.getItem("cart"));
            setCartItems(deserialized);
            setCartStateLoaded(true);
        } else {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [JSON.stringify(cartItems)]);

    function addCartItem(item) {
        setCartItems(prev => {
            let itemFound = false;
            let list = prev.map(p => {
                if (p.id === item.id) {
                    itemFound = true;

                    return {
                        ...p,
                        amount: p.amount + 1
                    };
                }

                return p;
            });

            if (!itemFound) {
                item.amount = 1;
                list = [...prev, item];
            }

            return list;
        });
    }

    function removeCartItem(id) {
        setCartItems(prev => {
            const list = prev.filter(p => p.id !== id);

            return list;
        });
    }

    return {
        cartItems,
        currency,
        addCartItem,
        removeCartItem
    };
}