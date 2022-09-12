import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectIsAuth } from '../../redux/slices/auth';
import style from './CartItem.module.sass';
const EmptyCart: FC = () => {
  const isAuth = useTypedSelector(selectIsAuth);
  return (
    <div className={style.Cart}>
      <h1>Сожалеем, но ваша корзина пока пуста</h1>
      <div className={style.EmptyCart_links}>
        <Link className={style.Link} to="/menu">
          <h3>Перейти к меню</h3>
        </Link>
        {isAuth && window.localStorage.getItem('token') ? (
          <Link className={style.Link} to="/orders">
            <h3>Перейти к моим заказам</h3>
          </Link>
        ) : (
          <h3>Войдите, чтобы просмотреть заказы</h3>
        )}
      </div>
    </div>
  );
};

export default EmptyCart;
