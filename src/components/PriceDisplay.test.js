import React from "react";
import TestWrapper from "./TestWrapper";
import { render, screen } from "@testing-library/react";
import { CartContext } from "../context/cartContext";
import PriceDisplay from "./PriceDisplay";

it("should display the price with right currency symbol", () => {
    const currency = "€";

    render(
        <TestWrapper>
            <CartContext.Provider value={{currency}}>
                <PriceDisplay value={2.70} />
            </CartContext.Provider>
        </TestWrapper>
    );

    expect(screen.getByText(/€2\.70/)).toBeInTheDocument();
});