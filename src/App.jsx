import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Profile from './components/Profile/Profile';
import Card from './components/Card/Card';
import CreatePost from './components/CreatePost/CreatePost';
import { useCheckAuthQuery } from './store/posts';
import EditPost from './components/EditPost/EditPost';
import Authorization from './components/Authorization/Authorization';
import ArticleContent from './components/ArticleContent/ArticleContent';
import Registration from './components/Registration/Registration';

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
        <Route path="/" element={<ArticleContent verify={verify} page={page} setPage={setPage} />}>
          <Route path="/articles" />
        </Route>
        <Route path="articles/:slug" element={<Card verify={verify} auth={auth} />} />
        <Route path="articles/:slug/edit" element={<EditPost />} />
        <Route path="sign-up" element={<Registration />} />
        <Route path="sign-in" element={<Authorization />} />
        <Route path="profile" element={<Profile />} />
        <Route path="new-article" element={auth ? <CreatePost /> : <Navigate to="/sign-in" replace={true} />} />
      </Routes>
    </div>
  );
}

export default App;
