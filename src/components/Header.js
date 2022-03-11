import './Header.css';
import { Fragment } from "react";
import { Col, Row } from 'react-bootstrap';
import ProductSearch from './ProductSearch';

export default function Header() {
    return (
        <Fragment>
            <div className='Header'>
                <Row>
                    <Col md={3}>
                        <div className='Header-logo-container'>
                            <div className="Header-logo">
                                e-SHOP
                            </div>
                            <div className='Header-subtext'>Your number one address for e-commerce.</div>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className='Header-search-container'>
                            <ProductSearch />
                        </div>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}