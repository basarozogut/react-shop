import React from "react";
import ProductBrowser from "./ProductBrowser";
import TestWrapper from "./TestWrapper";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from "@testing-library/react";
import { makeAbsoluteUrl } from "../api/shopApi";

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
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]))
    }));

    render(
        <TestWrapper>
            <ProductBrowser />
        </TestWrapper>
    );

    await waitFor(() => {
        expect(screen.getByTestId("no-products-warning")).toBeInTheDocument();
    });
});

test("should render products if any product is found", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProducts))
    }));

    render(
        <TestWrapper>
            <ProductBrowser />
        </TestWrapper>
    );

    await waitFor(() => {
        expect(screen.getByTestId("product")).toBeInTheDocument();
    });
});