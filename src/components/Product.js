import { Card } from "react-bootstrap";
import { run as runHolder } from 'holderjs/holder';
import { useEffect } from "react";

export default function Product(props) {
    useEffect(() => { runHolder('image-class-name'); });

    return (
        <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.product.title} ({props.product.price})</Card.Title>
                <Card.Text>
                    {props.product.shortDescription}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}