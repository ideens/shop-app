import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'

import Rating from '../components/Rating'
import products from '../products'

const ProductPage = () => {
  // const [product, setProduct] = useState([])

  // useEffect(() => {
  //   async function getProduct() {
  //     const { data } = await axios.get('/products/')
  //     setProduct(data)
  //   }
  //   getProduct()
  // }, [])

  return (
    <div>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <i className="fas fa-arrow-left"></i> Back
      </Link>
      <Row>
        <Col md={6}>
          <Image />
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage
