import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import "./App.css";

import CreateProduct from './components/products/CreateProduct';
import ProductAdmin from './components/products/ProductAdmin';
import ProductList from './components/products/ProductList';
import UpdateProduct from './components/products/UpdateProduct';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/products/list" element={<ProductList />} />
          <Route exact path="/products/admin" element={<ProductAdmin />} />
          <Route exact path="/products/create" element={<CreateProduct />} />
          <Route exact path="/products/:id" element={<UpdateProduct />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
