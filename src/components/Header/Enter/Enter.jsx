import React from 'react';
import { Link } from 'react-router-dom';

import style from './enter.module.scss';

const Enter = () => {
  return (
    <div className={style.enter}>
      <Link to={'sign-in'}>Sign In</Link>
      <Link to={'sign-up'}>Sign Up</Link>
    </div>
  );
};

export default Enter;
