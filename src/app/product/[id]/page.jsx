"use client";
import React, { useRef, useState } from "react";
import { useParams } from "next/navigation";
// import { IconHeart, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";

// Example products (static for now)
const products = [
  {
    id: "1",
    title: "Wireless Headphones",
    price: 1999,
    description:
      "Experience high-fidelity sound with these wireless headphones. Perfect for music lovers and professionals.",
    category: "Electronics",
    image: "/headphones.jpg",
    features: ["Noise cancellation", "20h battery", "Bluetooth 5.2"],
    specs: [
      { label: "Weight", value: "250g" },
      { label: "Material", value: "Plastic + Metal" },
    ],
    reviews: [
      { id: 1, user: "Amit", rating: 5, comment: "Superb sound quality!" },
      { id: 2, user: "Priya", rating: 4, comment: "Very comfortable to wear." },
    ],
  },
  {
    id: "2",
    title: "Classic T-shirt",
    price: 499,
    description:
      "Soft, comfortable, and stylish. This classic t-shirt is a must-have for every wardrobe.",
    category: "Clothing",
    image: "/tshirt.jpg",
    features: ["100% cotton", "Slim fit", "Machine washable"],
    specs: [
      { label: "Sizes", value: "S, M, L, XL" },
      { label: "Material", value: "Cotton" },
    ],
    reviews: [{ id: 1, user: "Ravi", rating: 5, comment: "Great fit and quality!" }],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [rating, setRating] = useState(0);
  const commentRef = useRef();

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Product not found
      </div>
    );
  }

  // Cart
  const addToCart = () => {
    if (cart.find((item) => item.id === product.id)) {
      toast.error("Item already in cart");
      return;
    }
    setCart([...cart, product]);
    toast.success("Item added to cart");
  };

  const checkItemInCart = (p) => cart.find((item) => item.id === p.id);

  // Wishlist
  const addToWishlist = () => {
    if (wishlist.includes(product.id)) {
      toast.error("Item already in wishlist");
      return;
    }
    setWishlist([...wishlist, product.id]);
    toast.success("Added to wishlist");
  };

  const checkItemInWishlist = (id) => wishlist.includes(id);

  // Reviews
  const sendReview = () => {
    if (!commentRef.current.value) {
      toast.error("Please write a review");
      return;
    }
    product.reviews.push({
      id: product.reviews.length + 1,
      user: "Guest",
      rating,
      comment: commentRef.current.value,
    });
    toast.success("Review added successfully");
    commentRef.current.value = "";
    setRating(0);
  };

  const totalRatings = product.reviews.length;
  const avgRating =
    totalRatings > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / totalRatings
      : 0;

  return (
    <div className="bg-white min-h-screen mt-10 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
        {/* Left */}
        <div className="w-full md:w-1/2 h-[90vh] flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-2xl font-semibold text-red-900">
              ₹{product.price}
            </span>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Features:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Specs */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Specifications:
            </h2>
            <ul className="text-gray-600 space-y-2">
              {product.specs.map((s, i) => (
                <li key={i}>
                  <strong>{s.label}:</strong> {s.value}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="text-lg font-medium text-gray-800 mr-4"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) =>
                setQuantity(parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1)
              }
              className="w-16 text-center py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Rating */}
          <div className="mb-6">
            <div className="flex items-center">
              <div className="flex items-center border rounded-3xl shadow-md py-2 px-6 bg-gray-100 space-x-2">
                <span
                  className={`text-2xl font-bold ${
                    avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                  }`}
                >
                  {avgRating.toFixed(1)}
                </span>
                 {/* <IconStarFilled
                  className={`text-2xl ${
                    avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                  }`}
                /><IconStarFilled
                  className={`text-2xl ${
                    avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                  }`}
                /><IconStarFilled
                  className={`text-2xl ${
                    avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                  }`}
                /><IconStarFilled
                  className={`text-2xl ${
                    avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                  }`} */}
      
              </div>
              <span className="text-gray-600 text-sm mx-2 mt-1">
                ({totalRatings} Reviews)
              </span>
            </div>

            <StarRatings
              className="mt-5"
              rating={rating}
              starRatedColor="red"
              starEmptyColor="gray"
              changeRating={(r) => setRating(r)}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
            />
            <textarea
              ref={commentRef}
              className="w-full p-2 mt-5 border border-gray-300 rounded-md"
              placeholder="Write your review here..."
            ></textarea>
            <button
              onClick={sendReview}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit Review
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-2">
            <button
              disabled={checkItemInCart(product)}
              onClick={addToCart}
              className="w-full border md:w-auto px-4 py-2 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition disabled:bg-white disabled:text-gray-400 disabled:border-gray-400"
            >
              {checkItemInCart(product) ? "Item already in cart" : "Add to Cart"}
            </button>

            <button
              disabled={checkItemInWishlist(product.id)}
              onClick={addToWishlist}
              className="px-4 py-2 rounded-full bg-gray-200 text-black transition-all ease-in disabled:bg-red-500 disabled:text-white"
            >
              {/* {checkItemInWishlist(product.id) ? (
                <IconHeartFilled />
              ) : (
                <IconHeart />
              )} */}
            </button>
          </div>

          {/* Reviews */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white shadow-md rounded-lg p-6 mb-4"
                >
                  <h3 className="font-bold">{review.user}</h3>
                  {/* <StarRatings
                    readOnly
                    rating={review.rating}
                    starRatedColor="red"
                    starEmptyColor="gray"
                    numberOfStars={5}
                    starDimension="20px"
                  /> */}
                  <p className="text-gray-600 mt-2">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
