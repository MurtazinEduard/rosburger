import React, { FC } from 'react';
import style from './Main.module.sass';
const MainPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.Main}>
        <h1>Стек технологий:</h1>
        <h2>Frontend</h2>
        <ul>
          <li>React 18</li>
          <li>Redux(redux-toolkit)</li>
          <li>TypeScript</li>
          <li>React-router-dom</li>
          <li>React-hook-form</li>
          <li>Axios</li>
          <li>Sass</li>
          <li>Material UI</li>
        </ul>
        <h2>Backend</h2>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>Bcrypt</li>
          <li>Cors</li>
          <li>Mongoose</li>
          <li>Jsonwebtoken</li>
          <li>Express-validator</li>
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
