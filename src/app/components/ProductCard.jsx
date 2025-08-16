import React from "react";
import { Star } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer border border-transparent hover:border-indigo-400">
      <div className="h-40 w-full flex items-center justify-center bg-gray-100 rounded-lg mb-4">
        <img src={product.img} alt={product.name} className="max-h-32 object-contain" />
      </div>
      <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
      <p className="text-indigo-600 font-bold mb-2">${product.price}</p>
      {product.rating && (
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className={i < product.rating ? "text-yellow-400" : "text-gray-300"}
              fill={i < product.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      )}
      {product.description && (
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      )}
      <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
      <button
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition mt-auto"
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
}
