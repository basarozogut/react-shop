import React from "react";
import ProductSearch from "./ProductSearch";
import { render, fireEvent, screen } from "@testing-library/react";

it("sends search event when submitted", async () => {
    const handleSearchInputSubmit = jest.fn();
    render(<ProductSearch onSearchInputSubmit={handleSearchInputSubmit} />);

    fireEvent.submit(screen.getByPlaceholderText('Please enter the product you are looking for'));

    expect(handleSearchInputSubmit).toHaveBeenCalledTimes(1);
});