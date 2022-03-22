import { Fragment } from "react";
import useCart from "../hooks/useCart";

export default function PriceDisplay({value}) {
    const { currency } = useCart();

    value = value || 0;

    return <Fragment>{currency}{value.toFixed(2)}</Fragment>
}