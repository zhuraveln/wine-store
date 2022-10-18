import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Cart from './pages/Cart/Cart/Cart';
import Shop from './pages/Shop/Shop';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
