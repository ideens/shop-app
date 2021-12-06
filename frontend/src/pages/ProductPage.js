import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  ListGroupItem,
  Form,
} from 'react-bootstrap'
import { listProductDetail } from '../actions/productActions'
import { useParams } from 'react-router'

import Rating from '../components/Rating'
import CardHeader from 'react-bootstrap/esm/CardHeader'

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  useEffect(() => {
    dispatch(listProductDetail(id))
    console.log('dispatch reached')
  }, [])

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={`${process.env.REACT_APP_BASE_URL}${product.image}`}
            alt={product.name}
            fluid
          />
        </Col>
        <Col>
          <div>
            <ListGroupItem>
              <h3>{product.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color={'#f8e825'}
              />
            </ListGroupItem>
            <ListGroupItem>
              <p>{product.description}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h4>£{product.price}</h4>
            </ListGroupItem>
          </div>
        </Col>
        <Col md={3}>
          <Card className="card bg-light mb-3">
            <ListGroup>
              <ListGroupItem className="text-dark">
                <Row>
                  <Col>Price:</Col>
                  <Col>£{product.price}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem className="text-dark">
                <Row>
                  <Col>
                    {product.stockNum > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>

              {product.stockNum > 0 && (
                <ListGroupItem className="text-dark">
                  <Row>
                    <Col>Quantity</Col>
                    <Col xs="auto">
                      <Form.Control
                        as="select"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="sm"
                      >
                        {[...Array(product.stockNum).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem className="d-grid gap-2">
                <Button
                  type="button"
                  class="btn-dark btn-lg"
                  disabled={product.stockNum == 0}
                >
                  Add to cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage
