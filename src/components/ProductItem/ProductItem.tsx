import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { IProduct, IProductCart } from '../../redux/types';
import style from './ProductItem.module.sass';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import {
  addItemToCart,
  minusItemFromCart,
} from '../../redux/slices/cart';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const ProductItem: FC<IProduct> = ({ _id, title, subtitle, price, imgUrl }) => {
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
    if (oneProduct && oneProduct?.count > 0) {
      dispatch(minusItemFromCart(_id));
    }
  };
  return (
    <div className={style.Product}>
      <img className={style.Product_img} alt="img" src={imgUrl} />
      <span className={style.Product_title}>{title}</span>
      <span className={style.Product_subtitle}>{subtitle}</span>
      <div>От {price} ₽.</div>
      <Link className={style.Link} to={_id}>
        <div>Подробнее..</div>
      </Link>
      <div className={style.Product_footer}>
        <div className={style.Product_footer__buttons}>
          <div className={style.Product_footer__buttons__count}>
            Кол-во {oneProduct?.count || 0}
          </div>
          <div
            onClick={handleClickPlus}
            className={style.Product_footer__buttons__plusMinus}>
            <AddIcon fontSize="large" />
          </div>
          <div
            onClick={handleClickMinus}
            className={style.Product_footer__buttons__plusMinus}>
            <RemoveIcon fontSize="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
