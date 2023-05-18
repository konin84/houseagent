import "./App.css";
import "./css/home.css";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import UserManagement from "./pages/users/UserManagement";
import Profile from "./pages/users/Profile/Profile";
import ProfileUpdate from "./pages/users/Profile/ProfileUpdate";
import MyProfile from "./pages/users/Profile/MyProfile";
import CountrySelector from "./pages/CountrySelector";
import ErrorPage from "./pages/ErrorPage";
import House from "./pages/House/House";
import RealtorSignUp from "./pages/users/Realtors/RealtorSignUp";
import Tenant from "./pages/users/Tenants/Tenant";
import Realtor from "./pages/users/Realtors/Realtor";
import HouseOwners from "./pages/users/HouseOwners/HouseOwners";
import MakePayment from "./pages/Payment/MakePayment";
import Proof from "./pages/Payment/Proof";
// import Images from './pages/ImagesUpload';
import MyAgent from "./pages/users/MyAgent/MyAgent";
// import MyAgent from "./pages/users/HouseOwners/MyAgent";
// import MyAgent from "./pages/users/Tenants/MyAgent";
import Home from "./pages/HomePage/Home";
import Analytics from "./pages/Analytics/Analytics";
//

//

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="login" element={<Login />} />
        <Route path="welcome" element={<MainPage />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="house" element={<House />} />
        <Route path="house-owners" element={<HouseOwners />} />
        <Route path="realtor" element={<Realtor />} />
        <Route path="tenants" element={<Tenant />} />
        <Route path="payment" element={<MakePayment />} />
        <Route path="my-agent" element={<MyAgent />} />
        <Route path="proof/:id" element={<Proof />} />
        <Route path="country" element={<CountrySelector />} />
        <Route path="signup" element={<RealtorSignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/profile/update/:id" element={<ProfileUpdate />} />
        <Route path="myprofile" element={<MyProfile />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
