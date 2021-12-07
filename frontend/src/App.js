import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart.js'

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route path="/cart/:id/*" element={<Cart />} />
          <Route path="/login/" element={<LoginPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default App
