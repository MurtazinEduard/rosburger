import { Button } from '@mui/material';
import axios from '../../axios';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import style from './Cart.module.sass';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { clearCart } from '../../redux/slices/cart';
import { fetchAuthMe, selectIsAuth } from '../../redux/slices/auth';
import EmptyCart from '../../components/CartItem/EmptyCart';
const CartPage: FC = () => {
  const isAuth = useTypedSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();
  
  const { itemsInCart, totalPrice } = useTypedSelector((state) => state.cart);
  const onSendOrder = async () => {
    if (itemsInCart.length > 0 && isAuth) {
      try {
        const { data } = await axios.post('/orders', itemsInCart);
        if (data) {
          dispatch(clearCart());
          dispatch(fetchAuthMe());
          window.alert('Товар успешно оформлен, можете проверить его в разделе "МОИ ЗАКАЗЫ"')
        } else {
          window.alert('Не удалось оплатить заказ');
        }
      } catch (error) {
        console.warn(error);
        window.alert('Не удалось оплатить заказ');
      }
    }
  };
  return (
    <div className={style.wrapper}>
      {itemsInCart.length < 1 ? (
        <EmptyCart />
      ) : (
        <div className={style.Cart}>
          <div className={style.Cart_title}>
            <div>Корзина:</div>
            <Link to="/orders">
              <div className={style.Cart_title__orders}>Мои заказы</div>
            </Link>
          </div>
          <div className={style.Cart_product}>
            <div className={style.Cart_product__header}>
              <div>Товар</div>
              <div>Название</div>
              <div>Цена</div>
              <div>Количество</div>
              <div>Удалить</div>
            </div>
            <div className={style.Cart_product__items}>
              {itemsInCart.map((obj) => (
                <CartItem key={obj._id} {...obj} />
              ))}
            </div>

            <div className={style.Cart_product__footer}>
              <div>Итого: {totalPrice}Р.</div>
              <Button
                onClick={onSendOrder}
                color="inherit"
                variant="outlined"
                size="large">
                Оплатить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
