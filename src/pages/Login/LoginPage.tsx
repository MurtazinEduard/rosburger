import { Button, TextField } from '@mui/material';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import style from './Login.module.sass';

import { useForm } from 'react-hook-form';
import { AppDispatch } from '../../redux/store';
import {
  fetchAuth,
  fetchRegister,
  selectIsAuth,
} from '../../redux/slices/auth';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { IUserData } from '../../redux/types';

interface Props {
  registr: boolean;
}
type IValidation = {
  fullName: string;
  email: string;
  password: string;
};
const LoginPage: FC<Props> = ({ registr }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const isAuth = useTypedSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange',
  });

  async function onSubmitlogin(values: IValidation): Promise<void> {
    const { fullName, ...logValues } = values;
    const data = await dispatch(fetchAuth(logValues));
    const payload = data.payload as IUserData;
    if (!data.payload) {
      return alert('Не удалось зарегистрироваться');
    }
    if ('token' in payload) {
      window.localStorage.setItem('token', payload.token);
    }
  }

  const onSubmitRegister = async (values: IValidation) => {
    try {
      const data = await dispatch(fetchRegister(values));
      const payload = data.payload as IUserData;
      if (!data.payload) {
        return alert('Не удалось зарегистрироваться');
      }
      if ('token' in payload) {
        window.localStorage.setItem('token', payload.token);
      }
    } catch (error) {
      return alert(error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className={style.wrapper}>
      <div>
        {registr ? (
          <form
            onSubmit={handleSubmit(onSubmitRegister)}
            className={style.Login}>
            <div className={style.Login_title}>Регистрация</div>
            <TextField
              className={style.Login_textfield}
              helperText={errors.fullName?.message}
              label="Укажите ваше имя"
              type="string"
              error={Boolean(errors.fullName?.message)}
              margin="normal"
              {...register('fullName', {
                required: 'Имя должно быть больше 2х символов',
              })}
            />
            <TextField
              className={style.Login_textfield}
              helperText={errors.email?.message}
              label="Ваш email"
              type={'email'}
              error={Boolean(errors.email?.message)}
              {...register('email', { required: 'Укажите почту' })}
            />
            <TextField
              className={style.Login_textfield}
              helperText={errors.password?.message}
              label="Пароль"
              error={Boolean(errors.password?.message)}
              type={'password'}
              margin="normal"
              {...register('password', { required: 'Укажите пароль' })}
            />

            <div className={style.Login_buttons}>
              <Link className={style.Link} to="/login">
                <Button>Авторизация</Button>
              </Link>
              <Button type="submit" variant="contained">
                Регистрация
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmitlogin)} className={style.Login}>
            <div className={style.Login_title}>Авторизация</div>
            <TextField
              className={style.Login_textfield}
              helperText={errors.email?.message}
              label="Ваш логин"
              type={'email'}
              error={Boolean(errors.email?.message)}
              {...register('email', { required: 'Укажите почту' })}
            />
            <TextField
              className={style.Login_textfield}
              helperText={errors.password?.message}
              label="Пароль"
              error={Boolean(errors.password?.message)}
              type={'password'}
              margin="normal"
              {...register('password', { required: 'Укажите пароль' })}
            />
            <div className={style.Login_buttons}>
              <Link className={style.Link} to="/registration">
                <Button>Регистрация</Button>
              </Link>

              <Button type="submit" variant="contained">
                Войти
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
