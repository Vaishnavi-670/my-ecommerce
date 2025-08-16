'use client';
import { useState } from "react";
import { ShoppingCart, UserCircle, CreditCard, Package, Star, Heart, Tag, Search } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import Link from "next/link";

export default function Home() {
  const allProducts = [
    { id: 1, name: "Running Shoes", price: 99, category: "Clothing", img: "/shoes.png" },
    { id: 2, name: "Wireless Headphones", price: 199, category: "Electronics", img: "/headphones.png" },
    { id: 3, name: "Backpack", price: 129, category: "Clothing", img: "/backpack.png" },
    { id: 4, name: "Smartwatch", price: 249, category: "Electronics", img: "/watch.png" },
    { id: 5, name: "Sunglasses", price: 149, category: "Clothing", img: "/sunglasses.png" },
    { id: 6, name: "Digital Camera", price: 499, category: "Electronics", img: "/camera.png" },
    { id: 7, name: "T-shirt", price: 29, category: "Clothing", img: "/tshirt.png" },
    { id: 8, name: "Smartphone", price: 699, category: "Electronics", img: "/phone.png", rating: 4, description: "Lorem ipsum dolor amet, consectetur euisagend." },
    { id: 9, name: "Clay Pot", price: 59, category: "Home", img: "/pot.png" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  // const { cart, setCart } = useCart(); // Uncomment when CartContext is wrapped

  // Get unique categories from products
  const categories = Array.from(new Set(allProducts.map(p => p.category)));

  //Filtering logic
  const filteredProducts = allProducts.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.price >= priceRange[0] && p.price <= priceRange[1] &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort products by name
  const sortedProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

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
          <div className="flex-1 bg-amber-50 rounded-3xl mx-6">
            <SearchBar search={search} setSearch={setSearch} />
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative cursor-pointer">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs px-1.5 py-0.5 rounded-full">
                2
              </span>
            </div>
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
                      ${selectedCategory === cat ? "bg-indigo-200 font-semibold" : "hover:bg-indigo-100"}`}
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
            <input type="range" min="0" max="1000" className="w-full accent-indigo-600" />
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

                  <Link href={`/product/${product.id}`}>
                    <button className="border border-indigo-500 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-50 transition mb-2 w-full flex items-center justify-center gap-1">
                      View Details
                    </button>
                  </Link>
                  <button 
                    className="flex items-center justify-center gap-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-md text-sm font-medium hover:from-purple-700 hover:to-indigo-700 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={typeof product.inStock === 'boolean' ? !product.inStock : false}
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
      <section className="relative w-full h-96 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 overflow-hidden rounded-2xl shadow-2xl">
        <motion.div
          className="absolute top-20 right-20 text-blue-600"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <CreditCard size={50} />
        </motion.div>
        <motion.div
          className="absolute top-20 left-20 text-red-600"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <ShoppingCart size={50} />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/3 text-green-600"
          animate={{ y: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        >
          <Package size={50} />
        </motion.div>

        <motion.div
          className="absolute top-32 left-1/2 text-red-500"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          <Heart size={50} />
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-1/3 text-yellow-500"
          animate={{ y: [0, -30, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        >
          <Tag size={50} />
        </motion.div>

        {/* Text Content */}
        <div className="relative flex flex-col items-center justify-center h-full text-center ">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Shop Smart, Save More 🛒
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl">
            Discover amazing deals, easy payments, and fast delivery right at your
            fingertips.
          </p>
        </div>
      </section>


      {/* Footer */}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white mt-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-300 mb-4">ShopEase</h2>
            <p className="text-sm text-gray-200">
              Your trusted destination for top brands, best prices, and fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-yellow-300">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-300">About Us</a></li>
              <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
              <li><a href="/faq" className="hover:text-yellow-300">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/category/electronics" className="hover:text-yellow-300">Electronics</a></li>
              <li><a href="/category/clothing" className="hover:text-yellow-300">Clothing</a></li>
              <li><a href="/category/home" className="hover:text-yellow-300">Home & Living</a></li>
              <li><a href="/category/accessories" className="hover:text-yellow-300">Accessories</a></li>
              <li><a href="/category/gift-cards" className="hover:text-yellow-300">Gift Cards</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-200">Subscribe</h3>
            <p className="text-sm text-gray-200 mb-3">Get updates on new arrivals and offers.</p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 rounded-lg border border-gray-500 bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-indigo-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-indigo-500 mt-8 py-4 text-center text-sm flex flex-col md:flex-row items-center justify-between px-6 text-gray-200">
          <p>© {new Date().getFullYear()} Mitti Mahal. All Rights Reserved.</p>
          <div className="flex space-x-5 mt-3 md:mt-0">
            {/* Social Icons */}
            <a href="#" className="hover:text-yellow-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.27 4.27 0 001.87-2.36 8.59 8.59 0 01-2.72 1.04A4.22 4.22 0 0016 4a4.22 4.22 0 00-4.22 4.22c0 .33.04.66.11.97-3.51-.18-6.63-1.86-8.72-4.42a4.23 4.23 0 001.31 5.63c-.65-.02-1.27-.2-1.81-.5v.05a4.23 4.23 0 003.39 4.14c-.63.17-1.3.2-1.95.07a4.23 4.23 0 003.95 2.93A8.47 8.47 0 012 19.54 11.93 11.93 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.35 8.35 0 0022.46 6z" />
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.61 8.06 8 8.71V14.9H7.9v-2.86h2.1v-2.19c0-2.1 1.24-3.26 3.14-3.26.91 0 1.85.16 1.85.16v2.04H14c-1.04 0-1.36.64-1.36 1.29v1.95h2.31l-.37 2.86h-1.94v5.85c4.39-.65 8-4.29 8-8.71 0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="hover:text-yellow-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.58 8 8 8.72v-6.16h-2.4V12h2.4v-1.68c0-2.38 1.44-3.68 3.55-3.68 1 0 2.06.18 2.06.18v2.28h-1.16c-1.14 0-1.5.71-1.5 1.43V12h2.56l-.41 2.56h-2.15v6.16c4.42-.72 8-4.31 8-8.72 0-5.5-4.46-9.96-9.96-9.96z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>


    </div>
  );
}
