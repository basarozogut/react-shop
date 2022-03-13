import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/shopApi";
import useApiCall from "../hooks/useApiCall";

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

    return <p>{product.title}</p>
}