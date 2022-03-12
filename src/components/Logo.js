import './Logo.css';
import { Fragment } from "react";

export default function Header() {
    return (
        <Fragment>
            <div className="Logo">
                e-SHOP
            </div>
            <div className='Logo-subtext'>Your number one address for e-commerce.</div>
        </Fragment>
    );
}