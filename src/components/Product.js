import placeholder from "../images/product-placeholder.svg"
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Product({product}) {
    function makeLinkToProductDetails(inner) {
        return <Link data-testid="product-link" to={`/products/${product.id}`}>{inner}</Link>
    }

    return (
        <Card data-testid="product">
            {makeLinkToProductDetails(<Card.Img variant="top" src={placeholder} />)}
            <Card.Body>
                <Card.Title data-testid="product-title">{makeLinkToProductDetails(product.title)} ({product.price})</Card.Title>
                <Card.Text data-testid="product-short-description">
                    {product.shortDescription}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}