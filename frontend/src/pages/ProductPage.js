import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
import LoadSpinner from '../components/LoadSpinner'
import AlertMessage from '../components/AlertMessage'
import Rating from '../components/Rating'

const ProductPage = () => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const dispatch = useDispatch()
  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  useEffect(() => {
    dispatch(listProductDetail(id))
    console.log('dispatch reached')
  }, [dispatch, id])

  const addProductToCart = () => {
    console.log('added to cart:', id)
    navigate(`/cart/${id}?quantity=${quantity}`)
  }

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>

      {loading ? (
        <LoadSpinner />
      ) : error ? (
        <AlertMessage variant="warning">{error}</AlertMessage>
      ) : (
        <Row>
          <Col md={5}>
            <Image
              src={`${process.env.REACT_APP_BASE_URL}${product.image}`}
              alt={product.name}
              fluid
            />
          </Col>
          <Col>
            <div>
              <ListGroupItem className="pb-0">
                <h4>{product.name}</h4>
              </ListGroupItem>
              <ListGroupItem className="py-0">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={'#f8e825'}
                />
              </ListGroupItem>
              <ListGroupItem>
                <h6>£{product.price}</h6>
              </ListGroupItem>
              <ListGroupItem className="py-0">
                <p>{product.description}</p>
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
                <hr className="my-0" style={{ color: '#bac4d4' }} />
                <ListGroupItem className="text-dark">
                  <Row>
                    {product.stockNum > 0 ? (
                      <Col className="text-success">In Stock</Col>
                    ) : (
                      <Col className="text-dark">Out of Stock</Col>
                    )}
                  </Row>
                </ListGroupItem>
                <hr className="my-0" style={{ color: '#bac4d4' }} />
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
                <ListGroupItem className="d-grid gap-2 pt-1">
                  <button
                    type="button"
                    className="btn-dark"
                    onClick={addProductToCart}
                    disabled={product.stockNum == 0}
                    style={{
                      borderRadius: '8px',
                    }}
                  >
                    Add to cart
                  </button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductPage
