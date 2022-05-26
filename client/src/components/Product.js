import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { addToCart } from '../actions/cartActions';
import { formatAsCurrency, getDiscountedPrice } from '../utils/commonUtil';

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
              numRatings={product.numRatings || 0}
            />
          </Card.Text>
          <div id='product-price'>
            {product.discount > 0 ?
              <>
                <Card.Text as='h6'>
                  <span className='strikethrough'>₹{formatAsCurrency(product.price)}</span>&nbsp;
                  {product.discountType === '%' ?
                    <span className='discount-display'>{product.discount}{product.discountType} off</span>
                    :
                    <span className='discount-display'>{product.discountType}{formatAsCurrency(product.discount)} off</span>
                  }
                </Card.Text>
                <Card.Text as='h5'>
                  ₹{formatAsCurrency(getDiscountedPrice(product))}
                </Card.Text>
              </>
              :
              <>
                <Card.Text as='h5' id='no-discount-price'>
                  ₹{formatAsCurrency(product.price)}
                </Card.Text>
              </>
            }
          </div>
          <Button type='button' className='btn-block' disabled={product.countInStock < 1}
            onClick={() => dispatch(addToCart(product._id, 1))}>{product.countInStock > 0 ?
              'ADD to Cart' : 'Out of Stock'}</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;