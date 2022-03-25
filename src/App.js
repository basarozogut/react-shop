import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './components/Logo';
import ProductSearch from './components/ProductSearch'
import Cart from './components/Cart';
import UserPanel from './components/UserPanel';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from './context/cartContext';
import { useState } from "react";
import Categories from './components/Categories';

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [cartStateLoaded, setCartStateLoaded] = useState(false);

  function handleSearchInputSubmit(input) {
    if (input) {
      navigate(`/products?filter=${input}`)
    } else {
      navigate(`/products`)
    }
  }

  return (
    <Container>
      <header className='App-header sticky-top'>
        <Row>
          <Col md={3}>
            <div className='App-header-logo-container'>
              <Logo />
            </div>
          </Col>
          <Col md={9}>
            <div className='App-header-search-container'>
              <ProductSearch
                initialSearchInput={searchParams.get('filter')}
                onSearchInputSubmit={handleSearchInputSubmit}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Categories />
          </Col>
        </Row>
      </header>
      <main>
        <CartContext.Provider value={{ cartItems, setCartItems, currency: '$', cartStateLoaded, setCartStateLoaded }}>
          <Row>
            <Col xl={3} md={4}>
              <Cart />
            </Col>
            <Col xl={9} md={8}>
              <div className='App-outlet-container'>
                <Outlet />
              </div>
            </Col>
          </Row>
        </CartContext.Provider>
      </main>
    </Container>
  );
}

export default App;
