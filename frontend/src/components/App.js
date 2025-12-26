import { Route, Routes } from "react-router-dom";
import Signup from "./auth/Signup";
import VerifyAccount from "./auth/VerifyAccount";
import Footer from "./Footer";
import Header from "./Header";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyAccount />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
