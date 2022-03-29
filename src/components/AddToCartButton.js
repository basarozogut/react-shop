import './AddToCartButton.scss';
import { Button } from "react-bootstrap";
import useCart from "../hooks/useCart";

export default function AddToCartButton({productId}) {
    const { addCartItem } = useCart();

    return <Button className='AddToCartButton' onClick={() => addCartItem({ id: productId })} variant="primary">Add To Cart</Button>;
}