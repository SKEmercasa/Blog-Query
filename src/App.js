import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Content from './components/Content/Content';
import { Header } from './components/Header/Header';
import Reg from './components/etc/Reg/Reg';
import Auth from './components/etc/Auth/Auth';
import Profile from './components/etc/Profile/Profile';
import Card from './components/Content/Card/Card';
import CreatePost from './components/etc/Update/CreatePost/CreatePost';
import { useCheckAuthQuery } from './redux/posts';

function App() {
  const [auth, setAuth] = useState(null);
  console.log(auth);
  const { data, isSuccess } = useCheckAuthQuery();
  const location = useLocation();
  console.log(location.state);
  useEffect(() => {
    setAuth(data);
  }, [isSuccess]);
  useEffect(() => {
    location.state && setAuth(location.state.data);
  }, [location.state]);
  return (
    <div className="App">
      <Header auth={auth} off={setAuth} />
      <Routes>
        <Route path="/" element={<Content />}>
          <Route path="/articles" />
        </Route>
        <Route path="articles/:slug" element={<Card />} />
        <Route path="sign-up" element={<Reg />} />
        <Route path="sign-in" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-article" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App;
