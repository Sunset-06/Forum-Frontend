import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mantine/hooks';
import Navbar from './components/Navbar.tsx';
import Sidebar from './components/Sidebar.tsx';
import HomePage from './pages/Home.tsx';
import SignIn from './pages/SignIn.tsx';
import Register from './pages/Register.tsx';
import Profile from './pages/Profile.tsx';
import Categories from './pages/Categories.tsx';
import Saved from './pages/Saved.tsx';
import CategoryPage from './pages/Category.tsx';
import Thread from './pages/Thread.tsx';
import AddThread from './pages/AddThread.tsx'

const isLargeScreen = useMediaQuery('(min-width: 768px)');

const Layout = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flexGrow: 1, marginTop: "56px", marginLeft: isLargeScreen? '80px':'0' }}>
      <Outlet />
    </div>
  </div>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/cats" element={<Categories />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/cats/*" element={<CategoryPage />} />
          <Route path="/thread/:id" element={<Thread />} />
          <Route path="/create" element={<AddThread />} />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Router;
