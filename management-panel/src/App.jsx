import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserList from "./pages/user/UserList";
import ProductList from "./pages/product/ProductList";
import HomePage from "./HomePage";
import UserDetail from "./pages/user/UserDetail";
import UserAdd from "./pages/user/UserAdd";
import UserEdit from "./pages/user/UserEdit";
import ProductDetail from "./pages/product/ProductDetail";
import ProductEdit from "./pages/product/ProductEdit";
import ProductAdd from "./pages/product/ProductAdd";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add" element={<ProductAdd />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/add" element={<UserAdd />} />
        <Route path="/user/:id" element={<UserDetail />} />
        <Route path="/user/edit/:id" element={<UserEdit />} />
      </Routes>
    </>
  );
}

export default App;
