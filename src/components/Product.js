import axios from 'axios';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';

function Product(props) {
    const {product} =props;

    const {state,dispatch:ctxDispatch} = useContext(Store);

    const {
        cart :{ cartItems},
    } = state;


    const addToCartHandler= async(item) =>{
      const existItem = cartItems.find((x)=>x._id === product._id);
  const quantity = existItem? existItem.quantity+1 : 1 ;
      const {data} = await axios.get(`/api/products/${item._id}`);
      if(data.countInStock<quantity){
          window.alert('sorry. Product is out of stock');
          return;
        }
      
            ctxDispatch({type:'CART_ADD_ITEM',payload:{...item,quantity}});
  }
    
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
              {product.countInStock===0 ?<Button variant='light' disabled>Out of stock</Button>:
              <Button onClick={()=>{addToCartHandler(product)}} variant="warning">Add to Cart</Button>
              }
              </Card.Body>
            </Card>);
}

export default Product;

