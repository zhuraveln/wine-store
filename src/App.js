import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Shop from './pages/Shop/Shop/Shop';
import FullWine from './components/FullWine/FullWine';
import Cart from './pages/Cart/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';

import './scss/app.scss';


function App() {

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/wine/:id" element={<FullWine />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
