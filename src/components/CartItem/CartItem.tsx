import React, { FC } from 'react';
import style from './CartItem.module.sass';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Divider } from '@mui/material';
import { addItemToCart, minusItemFromCart, removeItemFromCart } from '../../redux/slices/cart';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { IProductCart } from '../../redux/types';

const CartItem: FC<IProductCart> = ({ _id, title, count, price, imgUrl }) => {
  const dispatch = useDispatch<AppDispatch>();
  const oneProduct = useTypedSelector((state) =>
    state.cart.itemsInCart.find((obj) => obj._id === _id),
  );
  const handleClickPlus = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const cartItem: IProductCart = {
      _id,
      title,
      price,
      imgUrl,
      count: 0,
    };
    dispatch(addItemToCart(cartItem));
  };
  const handleClickMinus = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (oneProduct && oneProduct?.count > 1) {
      dispatch(minusItemFromCart(_id));
    }
  };
  const deleteItem = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(removeItemFromCart(_id))
  }
  return (
    <>
      <div className={style.Main}>
        <div className={style.Cart_item__img}>
          <img alt="Иконка" src={imgUrl} />
        </div>
        <div>{title}</div>
        <div>{price}Р.</div>
        <div className={style.Cart_item__counter}>
          <div onClick={handleClickPlus} className={style.Cart_item__counter__plus}>
            <AddIcon  titleAccess="Увеличить кол-во" fontSize="large" />
          </div>
          <div>{count}</div>
          <div onClick={handleClickMinus} className={style.Cart_item__counter__minus}>
            <RemoveIcon titleAccess="Уменьшить кол-во" fontSize="large" />
          </div>
        </div>
        <div onClick={deleteItem}>
          <CloseIcon
            titleAccess="Закрыть"
            className={style.Cart_item__close}
            fontSize="large"
          />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartItem;
