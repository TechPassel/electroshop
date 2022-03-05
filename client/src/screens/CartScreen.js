import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { formatAsCurrency, getDiscountedPrice } from '../utils/commonUtil';

const CartScreen = ({ match, location, history }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [bill, setBill] = useState({});

  useEffect(() => {
    const bill = {};
    //Note in case of substraction, multiplication and division we don't need to apply Number() or parseInt() 
    //method for converting formatted values into numbers, javascript will do it implicitely for us. But in case 
    //of 'addition' operation we need to apply it explicitely as addition is a valid operation for Strings also. 
    bill['totalItems'] = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
    bill['totalMrp'] = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    bill['mrpDiscount'] = cartItems.reduce((acc, item) => acc + item.qty * (item.discountType === "₹" ?
      Number(item.discount) : Math.round(item.price * item.discount / 100)), 0);
    bill['couponDiscount'] = 0;
    bill['deliveryCharge'] = 0;
    //Here we are considering couponDiscount and deliveryCharge as 0. But later we need to implement it. 
    bill['finalAmount'] = (bill.totalMrp + bill.deliveryCharge) - (bill.mrpDiscount + bill.couponDiscount);
    setBill(bill);
  }, [cartItems])


  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>
                    {/* <Row>
                      <Col>₹{formatAsCurrency(getDiscountedPrice(item))}</Col>
                      <Col>₹{formatAsCurrency(getDiscountedPrice(item))}</Col>
                    </Row> */}
                    {item.discount > 0 ?
                      <>
                        <Row>
                          <Col className='product-screen-price'>
                            <span className='strikethrough'>₹{formatAsCurrency(item.price)}</span>&nbsp;
                            {item.discountType === '%' ?
                              <span className='discount-display'>({item.discount}{item.discountType} off)</span>
                              :
                              <span className='discount-display'>({item.discountType}{item.discount} off)</span>
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col className='product-screen-price'>₹{formatAsCurrency(getDiscountedPrice(item))}</Col>
                        </Row>
                      </>
                      :
                      <Row>
                        <Col className='product-screen-price'>₹{formatAsCurrency(item.price)}</Col>
                      </Row>
                    }
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      className='item-quantity'
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Bill Details
              </h2>
              {bill.totalItems > 0 ?
                <>
                  <Row>
                    <Col>Total items:</Col>
                    <Col className='align-right'>{bill?.totalItems}</Col>
                  </Row>
                  <Row>
                    <Col>Total MRP:</Col>
                    <Col className='align-right'>₹{formatAsCurrency(bill?.totalMrp)}</Col>
                  </Row>
                  {bill.mrpDiscount > 0 &&
                    <Row>
                      <Col>Discount on MRP:</Col>
                      <Col className='align-right'>- ₹{formatAsCurrency(bill?.mrpDiscount)}</Col>
                    </Row>
                  }
                  {bill.couponDiscount > 0 &&
                    <Row>
                      <Col>Coupon Discount:</Col>
                      <Col className='align-right'>- ₹{formatAsCurrency(bill?.couponDiscount)}</Col>
                    </Row>
                  }
                  {bill.deliveryCharge > 0 &&
                    <Row>
                      <Col>Delivery Charge:</Col>
                      <Col className='align-right'>₹{formatAsCurrency(bill?.deliveryCharge)}</Col>
                    </Row>
                  }
                  <hr />
                  <Row>
                    <Col>Total Amount:</Col>
                    <Col className='align-right'>₹{formatAsCurrency(bill?.finalAmount)}</Col>
                  </Row>
                </> : 'Hey, there is nothing in your cart. Add some and grab the best deal. Hurry up!'}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
