import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Products</Link> | <Link to="/add">Add Product</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
