import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import LandingPage from "./LandingPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
