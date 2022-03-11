import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import shopApi from "../api/shopApi";
import Product from "./Product";

export default function (props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const query = props.searchCriteria ? `?q=${props.searchCriteria}` : "";
        shopApi.get(`products${query}`)
                .then(res => {
                    setProducts(res.data);
                });
    }, [props.searchCriteria]);

    return (
        <Row xs={1} md={2} className="g-4">
            {products.length > 0 && products.map((product) => (
                <Col md={4} key={product.id}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    );
}