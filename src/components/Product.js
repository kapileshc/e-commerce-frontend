import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
    const {product} =props;
    
  return (
      <Card key={product.slug}>
              <Link to={`./product/${product.slug}`}>
              <img src={product.image} className='card-img-top' alt={product.name}/>
              </Link>              
              <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title></Link>
                    <Rating rating={product.rating} numReview={product.numReviews}/>
              <Card.Text><strong>${product.price}</strong></Card.Text>
              <Button variant="warning">Add to Cart</Button>
              </Card.Body>
            </Card>);
}

export default Product;