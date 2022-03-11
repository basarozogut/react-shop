import { useState } from "react";
import { Form } from "react-bootstrap";

export default function ProductSearch(props) {
    const [searchInput, setSearchInput] = useState("");

    function handleOnSearchInputChange(e){
        setSearchInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        // TODO submit search to app
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