import React, { FC, useState } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
import style from './Menu.module.sass';
import { IProduct } from '../../redux/types';
import axios from '../../axios';
import ProductItemLoader from '../../components/ProductItem/ProductItemLoader';


const MenuPage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeSearchButton, setActiveSearchButton] = useState<string>('Все');
  const [isLoading, setIsLoading] = useState<boolean>(true)
  React.useEffect(() => {
    fetchSortedProducts();
  }, [activeSearchButton]);
  const fetchSortedProducts = async () => {
    setIsLoading(true)
    const sortedProducts = await axios.post('/products/sorted', {
      category: activeSearchButton,
    });
    setProducts(sortedProducts.data.products);
    setCategories(sortedProducts.data.categories)
    setIsLoading(false)
  };

  const filterProducts = (categ: string) => {
    setActiveSearchButton(categ);
  };

  return (
    <div className={style.Menu}>
      <div className={style.Menu_layout}>
        <div className={style.Menu_title}>МЕНЮ:</div>
        <div className={style.Menu_nav}>
          {categories.map((item) => (
            <div
              onClick={() => filterProducts(item)}
              className={
                activeSearchButton === item
                  ? style.Menu_nav__item__active
                  : style.Menu_nav__item
              }
              key={item}>
              {item}
            </div>
          ))}
        </div>
        <div className={style.Menu_Products}>
          {isLoading
            ? [...Array(6)].map((_, index) => <ProductItemLoader key={index}/>)
            : products.map((item) => <ProductItem key={item._id} {...item} /> )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
