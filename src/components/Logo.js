import './Logo.css';
import { Fragment } from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <Fragment>
            <div className="Logo">
                <Link to="/">e-SHOP</Link>
            </div>
            <div className='Logo-subtext'>Your number one address for e-commerce.</div>
        </Fragment>
    );
}