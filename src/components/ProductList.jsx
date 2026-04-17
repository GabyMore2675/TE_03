import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList() {

  // 🔥 AQUÍ VA
  const storedProducts =
    JSON.parse(localStorage.getItem("products")) || products;

  return (
    <div className="grid">
      {storedProducts.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;