"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import React from "react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );

  // Handle quantity change
  const incrementQty = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item) addToCart(item, 1);
  };
  const decrementQty = (id) => {
    const item = cart.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      addToCart(item, -1);
    } else if (item) {
      removeFromCart(id);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="text-center py-8 mb-5">
        <h1 className="text-4xl font-bold text-black">
          <span className="inline-block transform transition-transform duration-700 ease-in-out hover:-translate-y-1">
            Your Cart
            <img src="https://i.pinimg.com/236x/02/3b/3e/023b3e3ca534ae94a88cfc898b31e0cf.jpg" alt="Standard" className="inline-block object-cover w-14 h-16 ml-2" />
          </span>
        </h1>
        <p className="text-lg">A curated selection of your favorite products, ready to be shipped with care.</p>
      </header>
      <div className="flex mt-3">
        <div className="w-[68%] p-6">
          {/* Cart Items */}
          <div className="bg-white p-6 rounded-lg">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 py-12">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="mb-6 border-b pb-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-32 h-32">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    {/* Product Details */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <h3 className="text-md font-semibold">Price</h3>
                          <p className="text-lg text-gray-700">${item.price}</p>
                        </div>
                        <div className="text-center">
                          <h3 className="text-md font-semibold">Quantity</h3>
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => decrementQty(item.id)}
                              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                            >
                              -
                            </button>
                            <span>{item.quantity || 1}</span>
                            <button
                              onClick={() => incrementQty(item.id)}
                              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Cart Summary */}
        <div className="w-[32%] p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price:</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              onClick={clearCart}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition"
              disabled={cart.length === 0}
            >
              Clear Cart
            </button>
            <Link href="/checkout">
              <button
                className="w-full mt-4 bg-yellow-400 text-indigo-900 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
