import { Col, Row } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../api/shopApi";
import Product from "./Product";
import useApiCall from "../hooks/useApiCall";

export default function ProductBrowser() {
    let [searchParams] = useSearchParams();
    const searchInput = searchParams.get('filter');
    const [products, error] = useApiCall(() => fetchProducts(searchInput), null, [searchInput]);

    if (error) {
        console.log(error);
        return <p>There was an error while trying to fetch the products.</p>;
    }

    if (!products) {
        return <p>Loading...</p>
    }

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