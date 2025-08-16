"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { FaStar } from "react-icons/fa";

// Example products (replace with real data/API)
const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 1999,
    description: "Experience high-fidelity sound with these wireless headphones. Perfect for music lovers and professionals.",
    category: "Electronics",
    images: [
      "/headphones.png",
      "https://via.placeholder.com/400x400.png?text=Headphones+2",
      "https://via.placeholder.com/400x400.png?text=Headphones+3",
    ],
    reviews: [
      { id: 1, user: "Amit", rating: 5, comment: "Superb sound quality!" },
      { id: 2, user: "Priya", rating: 4, comment: "Very comfortable to wear." },
    ],
  },
  {
    id: 2,
    title: "Classic T-shirt",
    price: 499,
    description: "Soft, comfortable, and stylish. This classic t-shirt is a must-have for every wardrobe.",
    category: "Clothing",
    images: [
      "/tshirt.png",
      "https://via.placeholder.com/400x400.png?text=T-shirt+2",
    ],
    reviews: [{ id: 1, user: "Ravi", rating: 5, comment: "Great fit and quality!" }],
  },
];

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id;
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(product ? product.images[0] : "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Image Section */}
      <div>
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-96 object-contain rounded-xl shadow-lg bg-white"
        />
        <div className="flex mt-4 gap-2">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-contain cursor-pointer rounded-lg border ${
                selectedImage === img ? "border-indigo-600" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Details Section */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-2xl text-indigo-600 font-semibold">₹{product.price}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{product.category}</span>
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-3">
          <span className="font-medium">Quantity:</span>
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              className="px-3 py-1 text-lg"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 text-lg"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 transition w-max">
          Add to Cart
        </button>

        {/* Reviews Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <div
                key={review.id}
                className="border-b py-2 flex flex-col space-y-1"
              >
                <span className="font-medium">{review.user}</span>
                <div className="flex items-center text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}