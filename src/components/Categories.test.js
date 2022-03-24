import React from "react";
import Categories from "./Categories";
import TestWrapper from "./TestWrapper";
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from "@testing-library/react";
import { makeAbsoluteUrl } from "../api/shopApi";

const categories = [
    {
        "id": 1,
        "title": "Furniture",
        "slug": "furniture"
    },
    {
        "id": 2,
        "title": "Food",
        "slug": "food"
    }
];

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("should render categories", async () => {
    server.use(rest.get(makeAbsoluteUrl('/categories'), (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(categories))
    }));

    render(
        <TestWrapper>
            <Categories />
        </TestWrapper>
    );

    await waitFor(() => {
        expect(screen.getByText(/Furniture/)).toBeInTheDocument();
        expect(screen.getByText(/Food/)).toBeInTheDocument();
    });
});