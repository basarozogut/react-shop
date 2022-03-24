import React from "react";
import Product from "./Product";
import TestWrapper from "./TestWrapper";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CartContext } from "../context/cartContext";

const mockProduct = {
    "id": 1,
    "title": "Choc-o-Milk",
    "shortDescription": "Chocolate with milk.",
    "price": 4.99,
    "imageUrl": "",
    "category": "food"
};

it("should render product data", async () => {
    render(
        <TestWrapper>
            <Product product={mockProduct} />
        </TestWrapper>
    );

    await waitFor(() => {
        expect(screen.getByTestId("product")).toBeInTheDocument();
        expect(screen.getByTestId("product-title").innerHTML).toContain("Choc-o-Milk");
        expect(screen.getByTestId("product-title").innerHTML).toContain("$4.99");
        expect(screen.getByTestId("product-short-description").innerHTML).toContain("Chocolate with milk.");
        expect(screen.getByTestId("product-add-to-cart-button")).toBeInTheDocument();
        expect(screen.queryAllByTestId("product-link").length).toEqual(2);
    });
});

it("should add to cart when button is clicked", () => {
    const setCartItems = jest.fn();

    render(
        <TestWrapper>
            <CartContext.Provider value={{ setCartItems, cartStateLoaded: true }}>
                <Product product={mockProduct} />
            </CartContext.Provider>
        </TestWrapper>
    );

    fireEvent.click(screen.getByText(/Add to Cart/i))

    expect(setCartItems).toBeCalledTimes(1);
});