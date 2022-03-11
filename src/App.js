import './App.css';
import Product from './components/Product';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';

const products = [
  {
    id: 1,
    title: 'Choc-o-Milks',
    shortDescription: 'Chocolate with milk.',
    price: 4.99,
    imageUrl: ''
  }
]

function App() {
  return (
    <Container>
      <header className='App-header'>
        <Header />
      </header>
      <main>
        <Row>
          <Col md={3}>Cart Will Be Here</Col>
          <Col md={9}>
            <Row xs={1} md={2} className="g-4">
              {products.map((product) => (
                <Col md={4} key={product.id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;
