import { Divider } from '@mui/material';
import React, { FC } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IOrder } from '../../redux/types';
import style from './Orders.module.sass';
const OrdersPage: FC = () => {
  const user = useTypedSelector((state) => state.auth.data);
  const newDate = (date: string): string => {
    const dat = new Date(Number(date));
    return dat.toLocaleDateString();
  };
  if (!window.localStorage.getItem('token') && !user) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.Orders}>
        <div className={style.Orders_title}>
          <div>Мои заказы:</div>
          <Link to="/cart">
            <div>Вернуться в корзину</div>
          </Link>
        </div>
        {user && user?.orders.length < 1 ? (
          <h1>Список заказов пуст.</h1>
        ) : (
          <div className={style.Orders_main}>
            {user &&
              user.orders.map((item: IOrder) => (
                <div key={item.date} className={style.Orders_main__item}>
                  <div className={style.Orders_main__item__title}>
                    Заказ номер: {item.date}
                  </div>
                  <div className={style.Orders_main__item__info}>
                    <div>Статус: {item.status}</div>
                    <div>Дата: {newDate(item.date)}</div>
                    <div className={style.Orders_main__item__info__products}>
                      {item.items.map((prod) => (
                        <span key={prod._id}>
                          {prod.title} х{prod.count}{' '}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Divider />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
