import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap'
import AlertMessage from '../components/AlertMessage'
import { addToCart } from '../actions/cartActions'
import { useParams } from 'react-router'

const Cart = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const queryParams = new URLSearchParams(document.location.search)
  const quantity = queryParams.get('quantity')

  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  console.log('cart Items: ', cartItems)

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <Row>
        <Col md={8}>
          <h1>Cart</h1>
          {cartItems.length == 0 ? (
            <AlertMessage heading="Oops!" variant="light">
              Your cart is empty
            </AlertMessage>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroupItem key={item.product} className="pb-1">
                  <Row className="mt-1 mb-2">
                    <Col md={2}>
                      <Image
                        src={`${process.env.REACT_APP_BASE_URL}${item.image}`}
                        alt={item.name}
                        fluid
                        rounder
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </Col>
                    <Col md={3}>£{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        style={{
                          color: '#343A40',
                          backgroundColor: '#E9E9E8',
                          maxWidth: '45px',
                        }}
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(addToCart(item.product, e.target.value))
                        }
                        size="sm"
                      >
                        {[...Array(item.stockNum).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                  <hr className="mt-0 mb-0" style={{ color: 'white' }} />
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  )
}

export default Cart
