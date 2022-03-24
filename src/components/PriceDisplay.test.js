import React from "react";
import TestWrapper from "./TestWrapper";
import { render, screen } from "@testing-library/react";
import PriceDisplay from "./PriceDisplay";

it("should display the price with right currency symbol", () => {
    render(
        <TestWrapper>
            <PriceDisplay value={2.70} />
        </TestWrapper>
    );

    expect(screen.getByText(/\$2\.70/)).toBeInTheDocument();
});