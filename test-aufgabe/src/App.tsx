import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardPage from "./pages/DashboardPage";
import DetailsPage from "./pages/DetailsPage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/details/:isbn" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
