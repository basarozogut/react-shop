import { MemoryRouter } from "react-router-dom";

/**
 * Wraps the passed children with necessary contexts.
 */
export default function TestWrapper({ children }) {
    return (
        <MemoryRouter>
            {children}
        </MemoryRouter>
    );
}