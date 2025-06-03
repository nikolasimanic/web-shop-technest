import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import ProductList from './components/ProductList';
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
import Cart from './components/Cart';
import ContactUs from './components/ContactUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.scss';


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
