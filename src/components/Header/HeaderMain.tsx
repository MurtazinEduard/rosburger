import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.sass';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const HeaderMain: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useTypedSelector(selectIsAuth);

  const screenWidth: number = window.screen.width;
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };
  return (
    <>
      <div className={style.Header}>
        <Link to="/" className={style.Link}>
          <div className={style.Header_logo}>
            <div>Рос</div>
            <div className={style.Header_logo_burger}>бургер</div>
          </div>
        </Link>
        {screenWidth > 768 ? (
          <>
            <div className={style.Header_nav}>
              <Link to="/menu" className={style.Link}>
                <div className={style.Header_nav_item}>Меню</div>
              </Link>
              <Link to="/cart" className={style.Link}>
                <div className={style.Header_nav_item_cart}>Корзина</div>
              </Link>
            </div>

            <div className={style.Header_right}>
              {isAuth ? (
                <div onClick={onClickLogout} className={style.Header_nav_item}>
                  Выйти
                </div>
              ) : (
                <Link to="/login" className={style.Link}>
                  <div className={style.Header_nav_item}>Войти</div>
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
            <IconButton onClick={() => setMobileMenuState(true)}>
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={mobileMenuState}
              onClose={() => setMobileMenuState(false)}
              onOpen={() => setMobileMenuState(true)}>
              <IconButton onClick={() => setMobileMenuState(false)}>
                <ChevronRightIcon />
              </IconButton>
              <Divider />
              <List>
                <ListItem>
                  <Link to="/menu" className={style.Link}>
                    <div className={style.Header_nav_item}>Меню</div>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link to="/cart" className={style.Link}>
                    <div className={style.Header_nav_item}>Корзина</div>
                  </Link>
                </ListItem>
                {isAuth ? (
                  <ListItem>
                    <div
                      onClick={onClickLogout}
                      className={style.Header_nav_item}>
                      Выйти
                    </div>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Link to="/login" className={style.Link}>
                      <div className={style.Header_nav_item}>Войти</div>
                    </Link>
                  </ListItem>
                )}
              </List>
            </SwipeableDrawer>
          </>
        )}
      </div>
      <div className={style.underline} />
    </>
  );
};

export default HeaderMain;
