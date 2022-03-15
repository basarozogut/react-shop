import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/shopApi";
import Product from "./Product";

export default function ProductBrowser() {
    const [products, setProducts] = useState([]);
    let [searchParams] = useSearchParams();
    const searchInput = searchParams.get('filter');

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const response = await fetchProducts(searchInput);
                if (mounted) {
                    setProducts(response);
                }
            } catch (err) {
                console.log(err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [searchInput]);

    const renderProducts = () => {
        if (products.length <= 0) {
            return <p data-testid="no-products-warning">Sorry, no matching products found.</p>
        }

        return (
            <Row xs={1} md={2} className="g-4">
                {products.map((product) => (
                    <Col md={4} key={product.id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        );
    }

    return renderProducts();
}