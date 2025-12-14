import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../api";

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const currency = useMemo(
    () =>
      new Intl.NumberFormat("en-LK", { style: "currency", currency: "LKR" }),
    []
  );

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchProducts();
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
            Inventory
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Product catalog
          </h2>
          <p className="text-sm text-slate-500">
            Review current stock levels, pricing, and quickly jump into edits.
          </p>
        </div>
      </div>

      <div className="card-surface p-4 md:p-6">
        {products.length === 0 ? (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                No products yet
              </p>
              <p className="text-sm text-slate-500">
                Add your first product to begin tracking inventory.
              </p>
            </div>
            <Link
              to="/add"
              className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:bg-brand-600"
            >
              Add product
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {products.map((p) => (
              <article
                key={p.id}
                className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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
                    <Link
                      to={`/edit/${p.id}`}
                      className="text-sm font-semibold text-brand-700 underline-offset-4 hover:underline"
                    >
                      Edit
                    </Link>
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
        )}
      </div>
    </section>
  );
}
