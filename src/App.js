
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Navbar, Container, Badge, Nav} from 'react-bootstrap'

import {LinkContainer} from 'react-router-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Link } from 'react-router-dom';
import {Store} from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';

function App() {
  const {state} = useContext(Store);
  const {cart} =state;
  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
            <Navbar.Brand>
            e-BUY
            </Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-Link">
                Cart
                {cart.cartItems.length>0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=> a+ c.quantity,0)}
                  </Badge>
                )}
              </Link>

            </Nav>
          </Container>


        </Navbar>
        
        <h3>online shopping</h3>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen/>}/>
          <Route path="/cart" element={<CartScreen/>}/>
          <Route path="/" element={<HomeScreen/>}/>
          
        </Routes>
        
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;