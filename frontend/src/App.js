import Footer from './components/Footer'
import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <div>
      <Header />
      <Container className="py-3">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  )
}

export default App
