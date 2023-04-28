import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import style from '../sign.module.scss';
import { useLoginUserMutation } from '../../../redux/posts';

import View from './View/View';

const Auth = () => {
  const [loginUser, { data, isSuccess }] = useLoginUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      Cookies.set('Token', data.user.token, { sameSite: 'strict' });
      navigate('/', { state: { data } });
    }
  }, [isSuccess]);
  return (
    <div className={style.wrapper}>
      <div className={style.forForm}>
        <h2>Sign In</h2>
        <View login={loginUser} />
        <span className={style.other}>
          Don&#8217;t have an account? <Link to={'/sign-up'}>Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};
export default Auth;
