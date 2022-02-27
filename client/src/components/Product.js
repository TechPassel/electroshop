import React from 'react';
import {useDispatch} from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { addToCart } from '../actions/cartActions';

const Product = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews || 0}
            />
          </Card.Text>
          <Card.Text as='h3'>${product.price}</Card.Text>
          <Button type='button' className='btn-block' onClick={() => dispatch(addToCart(product._id, 1))}>ADD to Cart</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;