import React from "react";
import QueryStringWrapper from "./QueryStringWrapper";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

it("should pass query parameters to renderprop", () => {
    function MockRender(props) {
        return <p>Filter is: {props.input} Brand Name is: {props.brandName}</p>
    };

    render(
        <MemoryRouter initialEntries={["/products?filter=chocolate&brand=choco"]}>
            <Routes>
                <Route path='products'
                    element={<QueryStringWrapper
                        keysToMatch={['filter', 'brand']}
                        render={(props) => (<MockRender input={props.filter} brandName={props.brand} />)} />}
                />
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText("Filter is: chocolate Brand Name is: choco")).toBeInTheDocument();
});