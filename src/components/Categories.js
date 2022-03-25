import "./Categories.css"
import { Nav, Placeholder } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { fetchCategories } from "../api/shopApi";
import { Link } from "react-router-dom";

export default function Categories() {
    const [categories, error] = useApiCall(() => fetchCategories(), null, []);

    if (error) {
        return <div>Error while loading categories.</div>
    }

    if (!categories) {
        return (
            <Nav className="Categories justify-content-center" data-testid="category-placeholder">
                {[1, 2, 3, 4].map(id => (
                    <Nav.Item key={id}>
                        <Placeholder as={Nav.Link} animation="glow">
                            <Placeholder xs={12} dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(24) }}/>
                        </Placeholder>
                    </Nav.Item>
                ))}
            </Nav>
        );
    }

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