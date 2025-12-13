import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../api";
import { Link } from "react-router-dom";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - {p.quantity} pcs - ${p.price}{" "}
            <Link to={`/edit/${p.id}`}>Edit</Link>{" "}
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
