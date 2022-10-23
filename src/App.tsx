import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Shop from './pages/Shop/Shop';

import './scss/app.scss';

// import FullWine from './components/FullWine/FullWine';
// import Cart from './pages/Cart/Cart';
// import NotFound from './pages/NotFound/NotFound';

const FullWine = lazy(() => import('./components/FullWine/FullWine'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/wine/:id" element={<FullWine />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
