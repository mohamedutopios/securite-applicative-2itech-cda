import "./App.css";
import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProductListComponent from "./components/ProductListComponent";
import ProductDetailComponent from "./components/ProductDetailComponent";
import ProductFormComponent from "./components/ProductFormComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <Router>
      <HeaderComponent/>
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/products" element={<ProductListComponent />} />
        <Route path="/products/:id" element={<ProductDetailComponent />} />
        <Route path="/edit-product/:id" element={<ProductFormComponent />} />
      </Routes>
      </div>
    </Router>
  );
}
export default App;
