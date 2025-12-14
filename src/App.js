import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
          <header className="card-surface mb-10 flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-lg font-semibold text-white shadow-inner">
                IMS
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                  Inventory Manager
                </p>
                <h1 className="font-display text-2xl font-semibold text-slate-900">
                  Keep stock in sync
                </h1>
                <p className="text-sm text-slate-500">
                  Track items, adjust counts, and keep pricing current.
                </p>
              </div>
            </div>
            <nav className="flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:-translate-y-0.5 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-800 hover:shadow"
              >
                Products
              </Link>
              <Link
                to="/add"
                className="rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                + Add Product
              </Link>
            </nav>
          </header>

          <main className="space-y-8">
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/add" element={<AddProductPage />} />
              <Route path="/edit/:id" element={<EditProductPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
