import placeholder from "../images/product-placeholder.jpg"
import { Card, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import PriceDisplay from "./PriceDisplay";

export default function Product({ product, loading }) {
    function makeLinkToProductDetails(inner) {
        return <Link data-testid="product-link" to={`/products/${product.id}`}>{inner}</Link>
    }

    if (loading) {
        return (
            <Card data-testid="product-loading">
                <Card.Img variant="top" src={placeholder} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                    <Placeholder.Button variant="primary" xs={6} />
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card data-testid="product">
            {makeLinkToProductDetails(<Card.Img variant="top" src={placeholder} />)}
            <Card.Body>
                <Card.Title data-testid="product-title">{makeLinkToProductDetails(product.title)} (<PriceDisplay value={product.price} />)</Card.Title>
                <Card.Text data-testid="product-short-description">
                    {product.shortDescription}
                </Card.Text>
                <Card.Text data-testid="product-add-to-cart-button">
                    <AddToCartButton productId={product.id} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
}