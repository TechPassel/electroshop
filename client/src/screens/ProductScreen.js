/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import { formatAsCurrency, getDiscountedPrice } from '../utils/commonUtil';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const prodDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = prodDetails;
  const [msg, setMsg] = useState({});
  const [isProductAdded, setIsProductAdded] = useState(false);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const id = match.params.id;
    dispatch(productDetails(id));
  }, [match, dispatch]);

  useEffect(() => {
    if (isProductAdded) {
      setMsg({ text: "Product added to cart.", variant: "info" })
      setTimeout(() => {
        setMsg({});
      }, 2000);
    }
  }, [cartItems]);

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, qty));
    setIsProductAdded(true);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Link className='btn btn-light mb-3' to='/'>
              Go Back
            </Link>
          </Col>
          <Col>
            {msg.text &&
              <Message variant={msg.variant}>{msg.text}</Message>
            }
          </Col>
        </Row>
      </Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={product?.image}
              alt={product?.name}
              className='responsive-img'
            ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating || 0}
                  numRatings={product.numRatings || 0}
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                {product.discount > 0 ?
                  <>
                    <Row>
                      <Col>Price:</Col>
                      <Col as='h5' className='product-screen-price'>
                        <span className='strikethrough'>₹{formatAsCurrency(product.price)}</span>&nbsp;
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col as='h6' className='product-screen-price'>
                        {product.discountType === '%' ?
                          <span className='discount-display'>({product.discount}{product.discountType} off)</span>
                          :
                          <span className='discount-display'>({product.discountType}{product.discount} off)</span>
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                      <Col as='h5' className='product-screen-price'>₹{formatAsCurrency(getDiscountedPrice(product))}</Col>
                    </Row>
                  </>
                  :
                  <Row>
                    <Col>Price:</Col>
                    <Col as='h5' className='product-screen-price'>₹{formatAsCurrency(product.price)}</Col>
                  </Row>
                }
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product?.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>₹{formatAsCurrency(getDiscountedPrice(product))}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Staus</Col>
                    <Col>
                      {product?.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          className='item-quantity'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    {product.countInStock > 0 ? 'ADD to Cart' : 'Out of Stock'}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
