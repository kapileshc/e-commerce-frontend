import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Badge, Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { getError } from '../getError';
import { Store } from '../Store';

const reducer = (state,action) =>{
  switch(action.type){
      case 'FETCH_REQUEST':
          return{...state,loading:true};
      case 'FETCH_SUCCESS':
          return {...state, product:action.payload,loading:false}
      case 'FETCH_FAIL':
          return {...state,loading:false,error:action.payload}
      default:
          return state;
      
  }
}

function ProductScreen() {
  
    const navigate = useNavigate();
    const {slug} = useParams();
    const [{loading,error,product}, dispatch ] = useReducer(reducer,{
      loading:true,
      error:'',
      product:[]
  
  });

  useEffect(()=>{
    const fetchData = async()=>{
        dispatch({type:'FETCH_REQUEST'})
        try{
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({type:'FETCH_SUCCESS',payload:result.data});
        } catch(err){
            dispatch({type:'FETCH_FAIL',payload:getError(err)});
        }
         
    };
    fetchData();
},[slug])

const {state,dispatch: ctxDispatch} = useContext(Store);
const {cart} = state;

const addToCartHandler= async() =>{
  const existItem = cart.cartItems.find((x)=>x._id === product._id);
  const quantity = existItem? existItem.quantity+1 : 1 ;
  const {data} =await axios.get(`/api/products/${product._id}`);
  if(data.countInStock<quantity){
    window.alert('sorry. Product is out of stock');
    return;
  }

      ctxDispatch({type:'CART_ADD_ITEM',payload:{...product,quantity}});
     navigate('/cart');
}
    
  return (
    loading?(<LoadingBox/>)
    :error? (<MessageBox>{error}</MessageBox>)
    :(<div>
      <Row>
        <Col md={6}>
          <img className='img-large' src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
            </ListGroupItem>
            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>Description:
              <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock>0?<Badge bg="success">In stock</Badge>:<Badge bg="danger">unavailable</Badge>}</Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock>0 && (
                  <ListGroupItem>
                    <div className='d-grid'>
                      <Button onClick={addToCartHandler} variant='primary'>Add to cart</Button>
                    </div>
                  </ListGroupItem>
                )
                }
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>)
  )
}

export default ProductScreen;
