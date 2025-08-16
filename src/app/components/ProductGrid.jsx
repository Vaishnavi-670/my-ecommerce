import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return <div className="text-center text-gray-500 py-12">No products found.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
