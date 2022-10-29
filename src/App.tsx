import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header/Header'
import Shop from './pages/Shop/Shop'

import './scss/app.scss'

const SignUp = lazy(() => import('./components/SignUp/SignUp'))
const SignIn = lazy(() => import('./components/SignIn/SignIn'))
const FullWine = lazy(() => import('./components/FullWine/FullWine'))
const Cart = lazy(() => import('./pages/Cart/Cart'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))
const ConfirmPurchase = lazy(
  () => import('./pages/Cart/ConfirmPurchase/ConfirmPurchase')
)

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Shop />} />
            <Route path='/auth/sign-up' element={<SignUp />} />
            <Route path='/auth/sign-in' element={<SignIn />} />
            <Route path='/wine/:id' element={<FullWine />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/cart/confirm' element={<ConfirmPurchase />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default App
