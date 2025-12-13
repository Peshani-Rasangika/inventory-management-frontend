import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProducts, updateProduct } from "../api";
import ProductForm from "../components/ProductForm";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getProducts();
      const p = res.data.find((item) => item.id === parseInt(id));
      setProduct(p);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleUpdate = async (updated) => {
    await updateProduct(id, updated);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <ProductForm initialData={product} onProductCreated={handleUpdate} />
    </div>
  );
}
