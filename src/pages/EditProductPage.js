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

  if (!product)
    return (
      <div className="card-surface p-5 text-sm text-slate-600">
        Loading product...
      </div>
    );

  const handleUpdate = async (updated) => {
    await updateProduct(id, updated);
    navigate("/");
  };

  return (
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Update
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">Edit product</h2>
        <p className="text-sm text-slate-500">
          Adjust stock, pricing, or naming to keep details accurate.
        </p>
      </div>

      <div className="card-surface p-5 md:p-7">
        <ProductForm initialData={product} onProductCreated={handleUpdate} />
      </div>
    </section>
  );
}
