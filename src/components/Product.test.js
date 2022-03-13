import React from "react";
import Product from "./Product";
import { render, screen, waitFor } from "@testing-library/react";

it("should render product data", async () => {
    const mockProduct = {
        "id": 1,
        "title": "Choc-o-Milk",
        "shortDescription": "Chocolate with milk.",
        "price": 4.99,
        "imageUrl": "",
        "category": "food"
    };

    render(<Product product={mockProduct} />);

    await waitFor(() => {
        expect(screen.getByTestId("product")).toBeInTheDocument();
        expect(screen.getByTestId("product-title").innerHTML).toContain("Choc-o-Milk");
        expect(screen.getByTestId("product-title").innerHTML).toContain("4.99");
        expect(screen.getByTestId("product-short-description").innerHTML).toContain("Chocolate with milk.");
    });
});