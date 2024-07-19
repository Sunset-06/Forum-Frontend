import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Footer from "./components/Footer";
import HomePage from "./pages/Home"  
import SignIn from "./pages/SignIn"
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import Categories from "./pages/Categories";

const Layout = () => (
  <div>
    <Sidebar />
    <Outlet />
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
          <Route index element={<HomePage />}/>
          <Route path="/profile" element={<Profile />}/> 
          <Route path="/cats" element={<Categories />}/> 
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
