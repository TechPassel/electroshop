import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])

  return (
    <div>
      <header>
        <Navbar className='navbar-height' bg='dark' variant='dark' expand='lg' collapseOnSelect fixed="top">
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>ElectroMart</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                    {cartItems.length > 0 &&
                      (<span className="cart-basket align-items-center justify-content-center">
                        {cartItems.length}
                      </span>)
                    }
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
