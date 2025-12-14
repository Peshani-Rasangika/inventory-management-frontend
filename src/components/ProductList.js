import { useEffect, useMemo, useState } from "react";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", quantity: "", price: "" });
  const [editId, setEditId] = useState(null);
  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }),
    []
  );

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProduct(editId, form);
        setEditId(null);
      } else {
        await createProduct(form);
      }
      setForm({ name: "", quantity: "", price: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="card-surface p-4 md:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
              Inventory
            </p>
            <h2 className="text-xl font-semibold text-slate-900">
              Quick create
            </h2>
          </div>
          {editId && (
            <span className="pill bg-brand-50 text-brand-700">
              Editing #{editId}
            </span>
          )}
        </div>

        <form className="grid gap-3 md:grid-cols-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="pill bg-brand-50 text-brand-700">
                    #{p.id}
                  </span>
                  <span className="pill bg-slate-100 text-slate-600">
                    {p.quantity} pcs
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {p.name}
                </h3>
                <p className="text-sm font-semibold text-brand-700">
                  {currency.format(p.price)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-sm font-semibold text-rose-600 underline-offset-4 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
