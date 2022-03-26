import React from "react";
import Cart from "./Cart";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from "@testing-library/react";
import { CartContext } from "../context/cartContext";
import { makeAbsoluteUrl } from "../api/shopApi";

const mockProducts = [
    {
        "id": 1,
        "title": "Choc-o-Milk",
        "shortDescription": "Chocolate with milk.",
        "price": 4.99,
        "imageUrl": "",
        "category": "food"
    },
    {
        "id": 2,
        "title": "Corn Flakes",
        "shortDescription": "Tasty corn flakes.",
        "price": 2.99,
        "imageUrl": "",
        "category": "food"
    },
    {
        "id": 3,
        "title": "Apple",
        "shortDescription": "Red apple.",
        "price": 0.99,
        "imageUrl": "",
        "category": "food"
    }
];

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render empty if cart is empty", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
    }));

    render(<Cart />);

    await waitFor(() => {
        expect(screen.getByText(/Cart is empty\./i)).toBeInTheDocument();
    });
});

it("should render products and amounts if cart is not empty", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockProducts.filter(p => p.id == 1 || p.id == 2)));
    }));

    const cartItems = [
        {
            id: 1,
            amount: 1
        },
        {
            id: 2,
            amount: 5
        }];

    render(
        <CartContext.Provider value={{ cartItems, cartStateLoaded: true }}>
            <Cart />
        </CartContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText(/Choc-o-Milk/i)).toBeInTheDocument();
        expect(screen.queryByText(/Choc-o-Milk \(1 pc\)/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Corn Flakes \(5 pcs\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Total:.*/i)).toBeInTheDocument();
    });
});

it("should render loading if products are null", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(null));
    }));

    const cartItems = [
        {
            id: 1,
            amount: 1
        }];

    render(
        <CartContext.Provider value={{ cartItems, cartStateLoaded: true }}>
            <Cart />
        </CartContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });
});

it("should render error if request has failed", async () => {
    server.use(rest.get(makeAbsoluteUrl('/products'), (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(null));
    }));

    const cartItems = [
        {
            id: 1,
            amount: 1
        }];

    render(
        <CartContext.Provider value={{ cartItems, cartStateLoaded: true }}>
            <Cart />
        </CartContext.Provider>
    );

    await waitFor(() => {
        expect(screen.getByText(/There was an error while trying to fetch the products\./i)).toBeInTheDocument();
    });
});