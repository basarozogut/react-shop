import React from "react";
import ProductBrowser from "./ProductBrowser";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from "@testing-library/react";

const mockProducts = [
    {
        "id": 1,
        "title": "Choc-o-Milk",
        "shortDescription": "Chocolate with milk.",
        "price": 4.99,
        "imageUrl": "",
        "category": "food"
    }
];

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render no product warning if no products are found", async () => {
    server.use(rest.get('http://localhost:3001/products', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
    }));

    render(<ProductBrowser searchInput={"Television"} />);

    await waitFor(() => {
        expect(screen.getByTestId("no-products-warning")).toBeInTheDocument();
    });
});

test("should render products if any product is found", async () => {
    server.use(rest.get('http://localhost:3001/products', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProducts))
    }));

    render(<ProductBrowser searchInput={"Cho"} />);

    await waitFor(() => {
        expect(screen.getByTestId("product")).toBeInTheDocument();
    });
});