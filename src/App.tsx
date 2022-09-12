import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HeaderMain from './components/Header/HeaderMain';
import NotFound from './components/NotFound';
import CartPage from './pages/Cart/CartPage';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';
import MenuPage from './pages/Menu/MenuPage';
import OrdersPage from './pages/Orders/OrdersPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { AppDispatch } from './redux/store';
import { fetchAuthMe } from './redux/slices/auth';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { itemsInCart} = useTypedSelector(state => state.cart)
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(itemsInCart);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [itemsInCart]);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);
  return (
    <div className="App">
      <HeaderMain />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage registr={false} />} />
        <Route path="/registration" element={<LoginPage registr={true} />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
