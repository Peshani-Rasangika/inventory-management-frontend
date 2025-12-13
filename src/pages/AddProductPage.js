import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api";

export default function AddProductPage() {
  const navigate = useNavigate();

  const handleCreated = async (product) => {
    await createProduct(product);
    navigate("/"); // Go back to product list
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <ProductForm onProductCreated={handleCreated} />
    </div>
  );
}
