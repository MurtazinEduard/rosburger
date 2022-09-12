import { Send } from '@mui/icons-material';
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

import React, { FC} from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectIsAuth } from '../../redux/slices/auth';

import style from './input.module.sass';

type IProps = any

const InputBar: FC<IProps> = ({onChangeInput, onSubmit, value, disable}) => {
  const isAuth = useTypedSelector(selectIsAuth);
  return (
    <div className={style.main}>
      <FormControl fullWidth>
        <InputLabel disabled={!isAuth}>{isAuth ? "Написать комментарий...": "Войдите, чтобы написать комментарий"}</InputLabel>
        <OutlinedInput
          color="primary"
          onChange={(e) => onChangeInput(e.target.value)}
          type={'text'}
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <Button
                onClick={onSubmit}
                disabled={value.length < 2 || disable || !isAuth}
                
                color="inherit"
                endIcon={<Send />}>
                Отправить
              </Button>
            </InputAdornment>
          }
          label={isAuth ? "Написать комментарий...": "Войдите, чтобы написать комментарий"}></OutlinedInput>
      </FormControl>
    </div>
  );
};

export default InputBar;
