import useCart from '../hooks/useCart';
import './Cart.css';
import useApiCall from "../hooks/useApiCall";
import { fetchProductsWithId } from "../api/shopApi";

export default function Cart() {
    const { cartItems, getCartItemById } = useCart();
    const cartItemIds = cartItems.map(item => item.id);
    const [products, error] =  useApiCall(() => fetchProductsWithId(cartItemIds), null, [JSON.stringify(cartItemIds)]);

    let content = null;

    if (error) {
        console.log(error);
        content = <p>There was an error while trying to fetch the products.</p>;
    } else if (!products) {
        content = <p>Loading...</p>
    } else if (products.length <= 0) {
        content = <p>Cart is empty.</p>
    } else {
        content =
            (<ul>
                {products.map(product => (
                    <li key={product.id}>{product.title} Amount: {getCartItemById(product.id).amount}</li>
                ))}
            </ul>);
    }

    return (
        <div className="Cart">
            <h3>Cart</h3>
            {content}
        </div>
    );
}