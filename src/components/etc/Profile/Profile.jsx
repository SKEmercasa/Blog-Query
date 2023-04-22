import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import { useUpdateUserMutation } from '../../../redux/posts';
import style from '../sign.module.scss';

import View from './View/View';

const Profile = () => {
  const [updateUser, { data, isSuccess }] = useUpdateUserMutation();
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
        <h2>Edit Profile</h2>
        <View updateUser={updateUser} />
      </div>
    </div>
  );
};
export default Profile;
