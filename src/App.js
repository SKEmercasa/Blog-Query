import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Content from './components/Content/Content';
import { Header } from './components/Header/Header';
import Reg from './components/etc/Reg/Reg';
import Auth from './components/etc/Auth/Auth';
import Profile from './components/etc/Profile/Profile';
import Card from './components/Content/Card/Card';
import CreatePost from './components/etc/Update/CreatePost/CreatePost';
import { useCheckAuthQuery } from './redux/posts';
import EditPost from './components/etc/Update/EditPost/EditPost';

function App() {
  const [auth, setAuth] = useState(null);
  const [verify, setVerify] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isSuccess } = useCheckAuthQuery();
  const location = useLocation();

  useEffect(() => {
    setAuth(data);
    setVerify(isSuccess);
  }, [isSuccess]);
  useEffect(() => {
    if (location.state) {
      setAuth(location.state.data);
      setVerify(true);
    }
  }, [location.state]);
  return (
    <div className="App">
      <Header data={auth} offData={setAuth} offAuth={setVerify} setPage={setPage} />
      <Routes>
        <Route path="/" element={<Content verify={verify} page={page} setPage={setPage} />}>
          <Route path="/articles" />
        </Route>
        <Route path="articles/:slug" element={<Card verify={verify} auth={auth} />} />
        <Route path="articles/:slug/edit" element={<EditPost />} />
        <Route path="sign-up" element={<Reg />} />
        <Route path="sign-in" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-article" element={auth ? <CreatePost /> : <Navigate to="/sign-in" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
