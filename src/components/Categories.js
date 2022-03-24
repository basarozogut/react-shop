import "./Categories.css"
import { Nav } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { fetchCategories } from "../api/shopApi";
import { Link } from "react-router-dom";

export default function Categories() {
    const [categories, error] = useApiCall(() => fetchCategories(), null, []);

    if (error) {
        return <div>Error while loading categories.</div>
    }

    if (categories) {
        return (
            <Nav className="Categories justify-content-center">
                <Nav.Link as={Link} to="/products">All</Nav.Link>
                {categories.map(category => (
                    <Nav.Item key={category.id}>
                        <Nav.Link as={Link} to={`/products?category=${category.slug}`}>{category.title}</Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        );
    }

    return null;
}