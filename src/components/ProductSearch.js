import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ProductSearch(props) {
    const [searchInput, setSearchInput] = useState(props.initialSearchInput ?? "");

    function handleOnSearchInputChange(e) {
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (props.onSearchInputSubmit) {
            props.onSearchInputSubmit(searchInput);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Please enter the product you are looking for"
                value={searchInput}
                onChange={handleOnSearchInputChange} />
        </Form>
    );
}