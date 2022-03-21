import React from "react";
import ProductDetails from "./ProductDetails";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from "@testing-library/react";
import { makeAbsoluteUrl } from "../api/shopApi";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockProduct =
{
    "id": 1,
    "title": "Choc-o-Milk",
    "shortDescription": "Chocolate with milk.",
    "price": 4.99,
    "imageUrl": "",
    "category": "food",
    "longDescription": "Delicious milk."
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should render product if product is found", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products/1'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProduct))
    }));

    render(
        <MemoryRouter initialEntries={["/products/1"]}>
            <Routes>
                <Route path='products/:productId' element={<ProductDetails />} />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Choc-o-Milk/i)).toBeInTheDocument();
        expect(screen.getByText(/4\.99/i)).toBeInTheDocument();
        expect(screen.getByText(/Chocolate with milk\./i)).toBeInTheDocument();
        expect(screen.getByText(/Delicious milk\./i)).toBeInTheDocument();
    });
});