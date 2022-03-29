import './App.scss';
import { Badge, Button, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import Logo from './components/Logo';
import ProductSearch from './components/ProductSearch'
import Cart from './components/Cart';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from './context/cartContext';
import { Fragment, useState } from "react";
import Categories from './components/Categories';
import { Cart as BsCart } from 'react-bootstrap-icons';

function App() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [cartStateLoaded, setCartStateLoaded] = useState(false);
  const [cartVisible, setCartVisible] = useState(false);

  const handleCartHide = () => setCartVisible(false);
  const handleCartShow = () => setCartVisible(true);

  function handleSearchInputSubmit(input) {
    if (input) {
      navigate(`/products?filter=${input}`)
    } else {
      navigate(`/products`)
    }
  }

  function getNumberOfCartItems() {
    if (cartItems && cartItems.length > 0) {
      return cartItems.map(item => item.amount).reduce((prev, cur) => prev + cur, 0);
    }

    return 0;
  }

  return (
    <div className='App-container'>
      <CartContext.Provider value={{ cartItems, setCartItems, currency: '$', cartStateLoaded, setCartStateLoaded }}>
        <header className='App-header sticky-top'>
          <Container>
            <Row>
              <Col md={{ order: 1, span: 3 }} xs={{ order: 1, span: 10 }}>
                <div className='App-header-logo-container'>
                  <Logo />
                </div>
              </Col>
              <Col md={{ order: 2, span: 8 }} xs={{ order: 3, span: 12 }}>
                <div className='App-header-search-container'>
                  <ProductSearch
                    initialSearchInput={searchParams.get('filter')}
                    onSearchInputSubmit={handleSearchInputSubmit}
                  />
                </div>
              </Col>
              <Col md={{ order: 3, span: 1 }} xs={{ order: 2, span: 1 }}>
                <div className='App-header-toolbar-container text-end'>
                  <Button variant="light" onClick={handleCartShow} title="My Cart" className='position-relative'>
                    <BsCart />
                    {cartItems && cartItems.length > 0 ? (
                      <Fragment>
                        <Badge bg="danger" className='position-absolute top-0 start-100 translate-middle badge rounded-pill'>{getNumberOfCartItems()}</Badge>
                        <span className="visually-hidden">cart items</span>
                      </Fragment>
                    ) : ("")}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <div className='App-header-categories'>
            <Container>
              <Row>
                <Col>
                  <Categories />
                </Col>
              </Row>
            </Container>
          </div>
        </header>
        <main>
          <Container>
            <Row>
              <Col>
                <div className='App-outlet-container'>
                  <Outlet />
                </div>
              </Col>
            </Row>
            <Offcanvas show={cartVisible} onHide={handleCartHide} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Cart</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Cart />
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        </main>
      </CartContext.Provider>
    </div>
  );
}

export default App;
