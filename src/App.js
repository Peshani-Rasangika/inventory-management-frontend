import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Inventory Management</h1>
      <ProductForm onProductCreated={() => setRefresh(!refresh)} />
      <ProductList key={refresh} />
    </div>
  );
}

export default App;
