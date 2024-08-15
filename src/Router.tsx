import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Sidebar from './components/Sidebar.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/Home.tsx';
import SignIn from './pages/SignIn.tsx';
import Register from './pages/Register.tsx';
import Profile from './pages/Profile.tsx';
import Categories from './pages/Categories.tsx';
import Saved from './pages/Saved.tsx';
import CategoryPage from './pages/Category.tsx';
import Thread from './pages/Thread.tsx';
import AddThread from './pages/AddThread.tsx'

const Layout = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flexGrow: 1, marginLeft: "80px", marginTop: "56px" }}>
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
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/cats" element={<Categories />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/cats/*" element={<CategoryPage />} />
          <Route path="/thread/*" element={<Thread />} />
          <Route path="/create" element={<AddThread />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
