import { Routes, Route } from "react-router-dom";
import AllAvailableProducts from "./components/AllAvailableProducts";
import AllProducts from "./components/AllProducts";
import CreateProduct from "./components/CreateProduct";
import Footer from "./components/Footer";
import Navbar from "./components/header/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/category/:category" element={<AllProducts />} />
        <Route path="/all-products" element={<AllAvailableProducts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
