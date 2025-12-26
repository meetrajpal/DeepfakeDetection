import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import VerifyAccount from "./auth/VerifyAccount";
import ConfirmUpdateEmail from "./email/ConfirmUpdateEmail";
import UpdateEmail from "./email/UpdateEmail";
import Footer from "./Footer";
import Header from "./Header";
import LandingPage from "./LandingPage";
import ConfirmForgotPassword from "./password/ConfirmForgotPassword";
import ForgotPassword from "./password/ForgotPassword";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/confirm-forgot-password"
          element={<ConfirmForgotPassword />}
        />
        <Route path="/update-email" element={<UpdateEmail />} />
        <Route path="/confirm-update-email" element={<ConfirmUpdateEmail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
