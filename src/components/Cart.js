import useCart from '../hooks/useCart';
import './Cart.css';
import useApiCall from "../hooks/useApiCall";
import { fetchProductsWithId } from "../api/shopApi";
import { Fragment } from 'react';
import PriceDisplay from "./PriceDisplay"
import { Button } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function Cart() {
    const { cartItems, removeCartItem } = useCart();
    const cartItemIds = cartItems.map(item => item.id);
    const [products, error] = useApiCall(() => fetchProductsWithId(cartItemIds), null, [JSON.stringify(cartItemIds)]);

    function getProductById(id) {
        return products.find(p => p.id === id);
    }

    let content = null;

    if (error) {
        console.log(error);
        content = <div>There was an error while trying to fetch the products.</div>;
    } else if (!products) {
        content = <div>Loading...</div>
    } else if (products.length <= 0) {
        content = <div>Cart is empty.</div>
    } else {
        const total = cartItems.reduce((prevItem, item) => {
            const product = getProductById(item.id);
            if (product) {
                return { price: prevItem.price + product.price * item.amount };
            }
            else {
                return { price: prevItem.price };
            }
        }, { price: 0 }).price;

        content =
            (
                <Fragment>
                    <ul className='list-unstyled Cart-itemlist'>
                        {cartItems.map(item => {
                            const product = getProductById(item.id);

                            if (!product) {
                                return null;
                            }

                            return (
                                <li className='Cart-item' key={product.id}><Link to={`/products/${product.id}`}>{product.title}</Link>{(item.amount > 1 ? ` (${item.amount} pcs)` : '')}<Button className='Cart-item-remove' variant="danger" size="sm" onClick={() => removeCartItem(product.id)}><Trash /></Button></li>
                            );
                        })}
                    </ul>
                    <div className='Cart-total'><strong>Total:</strong> <PriceDisplay value={total} /></div>
                </Fragment>
            );
    }

    return (
        <div className="Cart">
            <h3>Your Cart</h3>
            {content}
        </div>
    );
}