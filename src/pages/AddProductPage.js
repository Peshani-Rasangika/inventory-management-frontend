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
    <section className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
          Create
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Add new product
        </h2>
        <p className="text-sm text-slate-500">
          Capture the basics—name, quantity, and price—to start tracking
          instantly.
        </p>
      </div>

      <div className="card-surface p-5 md:p-7">
        <ProductForm onProductCreated={handleCreated} />
      </div>
    </section>
  );
}
