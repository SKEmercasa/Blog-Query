import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import style from '../sign.module.scss';
import { useAddUserMutation } from '../../../redux/posts';

import View from './View/View';

const Reg = () => {
  const [addUser, { data, isSuccess }] = useAddUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      Cookies.set('Token', data.user.token, { sameSite: 'strict' });
      navigate('/', { state: { data } });
    }
  }, [isSuccess]);
  return (
    <div className={style.wrapper}>
      <div className={style.forForm}>
        <h2>Create new account</h2>
        <View add={addUser} />
        <span className={style.other}>
          Already have an account? <Link to={'/sign-in'}>Sign In</Link>.
        </span>
      </div>
    </div>
  );
};
export default Reg;
