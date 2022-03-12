import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div>
      <header>
        <Navbar className='py-2' bg='dark' variant='dark' expand='lg' collapseOnSelect fixed="top">
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
                {userInfo? 
                <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>  
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>:
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
