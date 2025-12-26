import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LandingPage from './LandingPage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import VerifyAccount from './auth/VerifyAccount';
import Dashboard from './Dashboard';
import ForgotPassword from './password/ForgotPassword';
import ConfirmForgotPassword from './password/ConfirmForgotPassword';
import UpdateEmail from './email/UpdateEmail';
import ConfirmUpdateEmail from './email/ConfirmUpdateEmail';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {/* {!['/verif-email', '/confirm-forgot-password', '/confirm-update-email'].includes(location.pathname) && <Header />} */}
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/verify-email' element={<VerifyAccount />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/confirm-forgot-password' element={<ConfirmForgotPassword />} />
        <Route path='/update-email' element={<UpdateEmail />} />
        <Route path='/confirm-update-email' element={<ConfirmUpdateEmail />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
