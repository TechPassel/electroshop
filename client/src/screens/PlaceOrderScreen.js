import React, { useEffect, useState } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { Link } from 'react-router-dom';
import { formatAsCurrency, getDiscountedPrice } from '../utils/commonUtil';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const [bill, setBill] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const bill = {};
        bill['totalItems'] = cart.cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
        bill['totalMrp'] = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
        bill['mrpDiscount'] = cart.cartItems.reduce((acc, item) => acc + item.qty * (item.discountType === "₹" ?
            Number(item.discount) : Math.round(item.price * item.discount / 100)), 0);
        bill['couponId'] = null;
        bill['couponDiscount'] = 0;
        bill['taxAmount'] = Math.round((bill.totalMrp - (bill.mrpDiscount + bill.couponDiscount)) * .05);
        //Here we are considering tax, couponDiscount and shippingCharge as 0. But later we need to implement it. 
        bill['shippingCharge'] = bill['totalMrp'] - (bill['mrpDiscount'] + bill['couponDiscount']) >= 2000 ? 0 : 100;
        bill['finalAmount'] = Math.round((bill.totalMrp + bill.shippingCharge + bill.taxAmount) - (bill.mrpDiscount + bill.couponDiscount));
        setBill(bill);
    }, [cart.cartItems])

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            console.log(order, "order");
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder(
            {
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                couponId: bill?.couponId,
                couponDiscount: bill?.couponDiscount,
                totalMrp: bill?.totalMrp,
                mrpDiscount: bill?.mrpDiscount,
                shippingCharge: bill?.shippingCharge,
                taxAmount: bill?.taxAmount,
                finalAmount: bill?.finalAmount
            }
        ));
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            {cart.shippingAddress && (
                                <p>
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address}{', '}
                                    {cart.shippingAddress.city}{', '}
                                    {cart.shippingAddress.state}{'('}
                                    {cart.shippingAddress.country} {'), '}
                                    {'Pin code -'}{cart.shippingAddress.postalCode}
                                </p>
                            )}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ?
                                <Message>Your cart is empty</Message> :
                                (<ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col md={3}>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <span className={item.discount > 0 ? 'strikethrough' : ''}>₹{formatAsCurrency(item.price)}</span>
                                                    {item.discount > 0 && (item.discountType === '%' ?
                                                        <div className='discount-display'>({item.discount}{item.discountType} off)</div>
                                                        :
                                                        <div className='discount-display'>({item.discountType}{formatAsCurrency(item.discount)} off)</div>
                                                    )}
                                                </Col>
                                                <Col md={4}>
                                                    <span>₹{formatAsCurrency(getDiscountedPrice(item))}</span> x {item.qty} =&nbsp;
                                                    <span>₹{formatAsCurrency(getDiscountedPrice(item) * item.qty)}</span>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>)
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Item</Col>
                                    <Col>{bill.totalItems}</Col>
                                </Row>
                                <Row>
                                    <Col>Total MRP</Col>
                                    <Col>₹{formatAsCurrency(bill?.totalMrp)}</Col>
                                </Row>
                                {bill.mrpDiscount > 0 &&
                                    <Row>
                                        <Col>Discount on MRP</Col>
                                        <Col>₹{formatAsCurrency(bill?.mrpDiscount)}</Col>
                                    </Row>
                                }
                                {bill.couponDiscount > 0 &&
                                    <Row>
                                        <Col>Coupon Discount</Col>
                                        <Col>₹{formatAsCurrency(bill?.couponDiscount)}</Col>
                                    </Row>
                                }
                                <Row>
                                    <Col>Delivery Charge</Col>
                                    <Col>₹{formatAsCurrency(bill?.shippingCharge)}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>₹{formatAsCurrency(bill?.taxAmount)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>₹{formatAsCurrency(bill?.finalAmount)}</Col>
                                </Row>
                            </ListGroup.Item>
                            {
                                error && (<ListGroup.Item>
                                    <Message variant='danger'>{error}</Message>
                                </ListGroup.Item>)
                            }
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen