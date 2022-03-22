import './ProductDetails.css';
import placeholder from "../images/product-placeholder-big.jpg"
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/shopApi";
import useApiCall from "../hooks/useApiCall";
import PriceDisplay from './PriceDisplay';
import AddToCartButton from './AddToCartButton';

export default function ProductDetails() {
    const params = useParams();
    const [product, error] = useApiCall(() => fetchProduct(params.productId), null, [params.productId]);

    if (error) {
        console.log(error);
        return <p>There was an error while trying to fetch the product.</p>;
    }

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <div className="ProductDetails">
            <h2 className='ProductDetails-title'>{product.title} (<PriceDisplay value={product.price} />)</h2>
            <p className='ProductDetails-short-description'>{product.shortDescription}</p>
            <figure>
                <img className="ProductDetails-image" src={placeholder} alt={product.title} />
            </figure>
            <p>{product.longDescription}</p>
            <p><AddToCartButton productId={product.id} /></p>
        </div>
    );
}