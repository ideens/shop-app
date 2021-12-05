import axios from 'axios'
import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import { useDispatch, useSelector } from 'react-redux'
import { productsList } from '../actions/productActions'

const Home = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  // const { error, loading, products } = productList
  const products = []

  useEffect(() => {
    console.log('use effect reached')
    dispatch(productsList())
    // updates store
  }, [])

  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   async function getProducts() {
  //     const { data } = await axios.get('http://localhost:8000/api/products/')
  //     setProducts(data)
  //   }
  //   getProducts()
  // }, [])

  return (
    <div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Home
