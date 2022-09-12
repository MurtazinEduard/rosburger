import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../../axios';
import CommentItem from '../../components/CommentItem/CommentItem';
import InputBar from '../../components/inputBar/InputBar';
import { IProduct } from '../../redux/types';
import style from './Product.module.sass';
const ProductPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IProduct>();
  const { id } = useParams();
  const [inputValue, setInputValue] = useState<string>('');
  const [isCommentLoading, setCommentLoading] = useState(false);
  React.useEffect(() => {
    getProductItem();
  }, []);
  const getProductItem = async () => {
    setIsLoading(true);
    await axios
      .get(`/products/${id}`)
      .then((res: { data: React.SetStateAction<IProduct> }) => {
        setData(res.data as IProduct);
      })
      .catch((err: any) => {
        console.warn(err);
        window.alert('Ошибка при получении товара');
        setIsLoading(false);
      })
      .finally(setIsLoading(false));
  };

  const handlerChangeInput = (e: string) => {
    setInputValue(e);
  };
  const handleSubmitComment = async () => {
    setCommentLoading(true);
    const comment = {
      comment: inputValue,
      _id: id,
    };
    await axios
      .post('/products/addComment', comment)
      .then(async () => {
        await getProductItem();
      })
      .catch((err: any) => {
        console.log(err);
        window.alert('Не удалось отправить комментарий');
      })
      .finally(() => {
        setCommentLoading(false);
      });

    setInputValue('');
  };
  return (
    <div className={style.wrapper}>
      <div className={style.Product}>
        <div className={style.Product_header}>
          <div className={style.Product_header__title}>Карточка товара:</div>
          <div>
            <Link to="/menu">
              <div>Вернуться в меню</div>
            </Link>
          </div>
        </div>
        {!data || isLoading ? (
          <h1>Не удалось загрузить товар</h1>
        ) : (
          <div>
            <div className={style.Product_item}>
              <img alt="фото продукта" src={data.imgUrl} />
              <div className={style.Product_item__description}>
                <div className={style.Product_item__description__title}>
                  {data.title}
                </div>
                <div className={style.Product_item__description__subtitle}>
                  {data.subtitle}
                </div>
                <Divider />
                <div
                  className={style.Product_item__description__mark}
                  style={{ color: 'grey', marginTop: '10px' }}>
                  Цены и ассортименты продуктов на сайте могут отличаться.
                  <br /> Наличие продуктов и цену уточняйте в выбранном
                  предприятии.
                </div>
              </div>
            </div>
            <div className={style.Product_comments}>
              <div
                className={
                  style.Product_comments__title
                }>{`Комментарии ${data.comments.length}`}</div>
              <InputBar
                disable={isCommentLoading}
                value={inputValue}
                onChangeInput={handlerChangeInput}
                onSubmit={handleSubmitComment}
              />
              <div className={style.Product_comments_block}>
                {data.comments.map((item) => (
                  <CommentItem key={item.date} {...item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
