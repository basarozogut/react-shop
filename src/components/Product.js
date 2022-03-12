import placeholder from "../images/product-placeholder.svg"
import { Card } from "react-bootstrap";

export default function Product(props) {
    return (
        <Card data-testid="product">
            <Card.Img variant="top" src={placeholder} />
            <Card.Body>
                <Card.Title>{props.product.title} ({props.product.price})</Card.Title>
                <Card.Text>
                    {props.product.shortDescription}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}