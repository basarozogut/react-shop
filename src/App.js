import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './components/Logo';
import ProductBrowser from './components/ProductBrowser';
import ProductSearch from './components/ProductSearch'
import { useState } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState("");

  function handleSearchInputSubmit(input) {
    setSearchInput(input);
  }

  return (
    <Container>
      <header className='App-header'>
        <Row>
          <Col md={3}>
            <div className='App-header-logo-container'>
              <Logo />
            </div>
          </Col>
          <Col md={9}>
            <div className='App-header-search-container'>
              <ProductSearch onSearchInputSubmit={handleSearchInputSubmit} />
            </div>
          </Col>
        </Row>
      </header>
      <main>
        <Row>
          <Col md={3}>Cart Will Be Here</Col>
          <Col md={9}>
            <ProductBrowser searchInput={searchInput} />
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;
