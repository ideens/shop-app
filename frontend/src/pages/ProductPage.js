import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { listProductDetail } from '../actions/productActions'

import Rating from '../components/Rating'

const ProductPage = ({ match }) => {
  const dispatch = useDispatch()
  const productDetail = useSelector((state) => state.productDetail)
  const { loading, error, product } = productDetail

  useEffect(() => {
    dispatch(listProductDetail())
  }, [])

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
