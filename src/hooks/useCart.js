import { useContext } from 'react';
import { CartContext } from '../context/cartContext';

export default function useCart() {
    const { cartItems, setCartItems, currency } = useContext(CartContext);

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
        setCartItems(prev => prev.filter(p => p.id !== id));
    }

    return { 
        cartItems,
        currency,
        addCartItem,
        removeCartItem       
     };
}