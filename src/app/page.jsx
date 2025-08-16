'use client';
import { useState } from "react";
import { ShoppingCart, UserCircle, CreditCard, Package, Star, Heart, Tag, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, CartProvider } from "@/context/CartContext";
import Link from "next/link";
import products from "@/data/products";

function HomeContent() {
  const allProducts = products;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { addToCart, cart } = useCart();

  // Get unique categories from products
  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  // Filtering logic
  const filteredProducts = allProducts.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1] &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort products by name
  const sortedProducts = filteredProducts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <img
            className="w-16 h-16 rounded-full object-cover object-center border border-yellow-300 bg-white"
            src="f3d5494e3305474604ed4189d96f8604.jpg"
            alt="ShopEase Logo"
          />

          {/* Search bar */}
          <div className="relative mx-7 w-full">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full rounded-2xl px-5 py-2 bg-amber-50 text-black focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
            <UserCircle size={28} className="cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full px-6 py-8 space-x-6">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-indigo-50 to-purple-100 text-gray-900 rounded-2xl p-6 shadow space-y-6">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div>
            <h3 className="font-medium mb-2">Category</h3>
            <ul className="space-y-2">
              {["All", "Electronics", "Clothing", "Home"].map((cat) => (
                <li key={cat}>
                  <label
                    className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md transition 
                      ${
                        selectedCategory === cat
                          ? "bg-indigo-200 font-semibold"
                          : "hover:bg-indigo-100"
                      }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    {cat}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-sm">
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <section className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Listing</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <>
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow rounded-xl p-4 flex flex-col transition-transform duration-200 hover:scale-105 hover:shadow-2xl cursor-pointer border border-transparent hover:border-indigo-400"
                >
                  <div className="h-40 w-full flex items-center justify-center  rounded-lg mb-4">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="h-full w-full object-contain rounded-lg"
                    />
                  </div>

                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mb-2">${product.price}</p>

                  {product.rating && (
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={
                            i < product.rating ? "text-yellow-400" : "text-gray-300"
                          }
                          fill={i < product.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  )}
                  {product.description && (
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  )}

                  <p className="text-sm text-gray-500 mb-4">
                    Category: {product.category}
                  </p>

                  <Link href={`/product/${product.id}`}>
                    <button className="border border-indigo-500 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-50 transition mb-2 w-full flex items-center justify-center gap-1">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center justify-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={typeof product.inStock === "boolean" ? !product.inStock : false}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </button>
                </div>
              ))}
            </>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  );
}
