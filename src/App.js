import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Products from './components/Products';
import {Routes, Route} from "react-router-dom";
import Footer from './components/Footer';
import Product from './components/Product';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/products/:id' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
