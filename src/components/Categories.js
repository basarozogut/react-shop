import "./Categories.css"
import { Nav, Placeholder } from "react-bootstrap";
import useApiCall from "../hooks/useApiCall";
import { fetchCategories } from "../api/shopApi";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";

export default function Categories() {
    const [categories, error] = useApiCall(() => fetchCategories(), null, []);
    const [searchParams] = useSearchParams();
    let location = useLocation();
    let slug = searchParams.get('category') || 'all';
    if (location.pathname !== '/products') {
        slug = null; // only display active keys on product browser route.
    }

    if (error) {
        return <div>Error while loading categories.</div>
    }

    if (!categories) {
        return (
            <Nav className="Categories justify-content-center" data-testid="category-placeholder">
                {[1, 2, 3, 4].map(id => (
                    <Nav.Item key={id}>
                        <Placeholder as={Nav.Link} animation="glow">
                            <Placeholder xs={12} dangerouslySetInnerHTML={{ __html: '&nbsp;'.repeat(24) }} />
                        </Placeholder>
                    </Nav.Item>
                ))}
            </Nav>
        );
    }

    return (
        <Nav className="Categories justify-content-center" activeKey={slug}>
            <Nav.Item>
                <Nav.Link as={Link} to="/products" eventKey="all">All</Nav.Link>
            </Nav.Item>
            {categories.map(category => (
                <Nav.Item key={category.id}>
                    <Nav.Link as={Link} to={`/products?category=${category.slug}`} eventKey={category.slug}>{category.title}</Nav.Link>
                </Nav.Item>
            ))}
        </Nav>
    );
}