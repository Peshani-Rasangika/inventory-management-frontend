import { useEffect, useState } from "react";

export default function ProductForm({ initialData = null, onProductCreated }) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [quantity, setQuantity] = useState(initialData?.quantity ?? "");
  const [price, setPrice] = useState(initialData?.price ?? "");
  const actionLabel = initialData ? "Save changes" : "Save product";

  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setQuantity(initialData.quantity ?? "");
      setPrice(initialData.price ?? "");
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onProductCreated({
        name,
        quantity: Number(quantity),
        price: Number(price),
      });
      setName("");
      setQuantity("");
      setPrice("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to save product");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Product name</span>
          <input
            placeholder="e.g., Wireless mouse"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Quantity</span>
          <input
            placeholder="0"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="0"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
        </label>

        <label className="md:col-span-2 space-y-2 text-sm font-medium text-slate-700">
          <span>Price</span>
          <input
            placeholder="0.00"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 shadow-sm outline-none transition focus:border-brand-400 focus:ring focus:ring-brand-100"
          />
        </label>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {actionLabel}
        </button>
      </div>
    </form>
  );
}
