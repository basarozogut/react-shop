import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './components/Logo';
import ProductSearch from './components/ProductSearch'
import Cart from './components/Cart';
import UserPanel from './components/UserPanel';
import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  function handleSearchInputSubmit(input) {
    if (input) {
      navigate(`/products?filter=${input}`)
    } else {
      navigate(`/products`)
    }
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
          <Col md={3}>
            <UserPanel />
            <Cart />
          </Col>
          <Col md={9}>
            <Outlet />
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;
