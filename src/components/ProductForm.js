import { useState, useEffect } from "react";

export default function ProductForm({ initialData = null, onProductCreated }) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [quantity, setQuantity] = useState(initialData?.quantity ?? "");
  const [price, setPrice] = useState(initialData?.price ?? "");

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
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <input
        placeholder="Price"
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
}
