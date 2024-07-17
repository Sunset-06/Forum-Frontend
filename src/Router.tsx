import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import HomePage from "./pages/Home"  
import AuthPage from "./pages/Auth"
import Profile from "./pages/Profile"

const Router = () => {
  return (
    <BrowserRouter>
     <Navbar />
     <Sidebar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
