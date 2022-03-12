import placeholder from "../images/product-placeholder.svg"
import { Card } from "react-bootstrap";

export default function Product({product}) {
    return (
        <Card data-testid="product">
            <Card.Img variant="top" src={placeholder} />
            <Card.Body>
                <Card.Title data-testid="product-title">{product.title} ({product.price})</Card.Title>
                <Card.Text data-testid="product-short-description">
                    {product.shortDescription}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}