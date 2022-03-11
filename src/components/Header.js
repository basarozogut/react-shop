import './Header.css';
import { Fragment } from "react";
import { Col, Row } from 'react-bootstrap';

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
                        search box here
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
}