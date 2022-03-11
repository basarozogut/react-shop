import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import ProductBrowser from './components/ProductBrowser';

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
            <ProductBrowser searchCriteria={""}/>
          </Col>
        </Row>
      </main>
    </Container>
  );
}

export default App;
