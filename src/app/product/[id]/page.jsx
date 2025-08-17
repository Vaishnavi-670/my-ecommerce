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
    title: "Running Shoes",
    price: 99,
    description: "Engineered for comfort and performance, these running shoes are perfect for athletes, joggers, and fitness enthusiasts. The lightweight and breathable mesh upper keeps your feet cool during intense workouts, while the durable rubber sole ensures excellent grip and stability. Ideal for long-distance runs, gym sessions, and everyday casual wear.",
    category: "Clothing",
    image: "/running shoes.jpg",
    features: ["Lightweight", "Breathable mesh", "Rubber sole"],
    specs: [
      { label: "Sizes", value: "6, 7, 8, 9, 10" },
      { label: "Material", value: "Mesh + Rubber" },
    ],
    reviews: [
      { id: 1, user: "Rahul", rating: 5, comment: "Very comfortable for jogging." },
      { id: 2, user: "Sneha", rating: 4, comment: "Good quality for the price." },
    ],
  },
  {
    id: "2",
    title: "Wireless Headphones",
    price: 199,
    description: "Experience premium sound with these wireless headphones. Designed for audiophiles and casual listeners alike, they offer crystal-clear audio, deep bass, and active noise cancellation. With up to 20 hours of battery life, Bluetooth 5.2 connectivity, and a comfortable over-ear design, you can enjoy your favorite music or calls all day without interruptions.",
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
    id: "3",
    title: "Backpack",
    price: 129,
    description: "This versatile backpack combines durability with style. Made from high-quality water-resistant polyester, it keeps your belongings safe in all conditions. Multiple compartments and pockets provide ample space for laptops, books, gadgets, and essentials. Comfortable padded straps ensure easy carrying, making it perfect for students, professionals, or travelers.",
    category: "Clothing",
    image: "/backpack.jpg",
    features: ["Multiple compartments", "Water-resistant", "Adjustable straps"],
    specs: [
      { label: "Capacity", value: "25L" },
      { label: "Material", value: "Polyester" },
    ],
    reviews: [
      { id: 1, user: "Karan", rating: 5, comment: "Perfect for travel." },
    ],
  },
  {
    id: "4",
    title: "Smartwatch",
    price: 249,
    description: "Stay connected and track your fitness goals with this feature-rich smartwatch. Monitor your heart rate, steps, sleep patterns, and more, all from your wrist. Water-resistant design allows for daily wear, while customizable watch faces let you match your style. Compatible with iOS and Android devices, it ensures seamless notifications and control over calls and messages.",
    category: "Electronics",
    image: "/watch.jpg",
    features: ["Heart rate monitor", "Step counter", "Water-resistant"],
    specs: [
      { label: "Battery Life", value: "48 hours" },
      { label: "Compatibility", value: "iOS & Android" },
    ],
    reviews: [
      { id: 1, user: "Neha", rating: 4, comment: "Good smartwatch for fitness tracking." },
    ],
  },
  {
    id: "5",
    title: "Sunglasses",
    price: 149,
    description: "Protect your eyes in style with these trendy sunglasses. Featuring UV-protective lenses and a lightweight frame, they are perfect for sunny days and outdoor activities. The polarized lenses reduce glare and enhance visual clarity, while the fashionable design complements any outfit. Ideal for driving, beach outings, or casual wear.",
    category: "Clothing",
    image: "/sunglasses.jpg",
    features: ["UV protection", "Lightweight frame", "Polarized lenses"],
    specs: [
      { label: "Material", value: "Plastic" },
      { label: "Lens", value: "Polycarbonate" },
    ],
    reviews: [
      { id: 1, user: "Riya", rating: 5, comment: "Stylish and protective!" },
    ],
  },
  {
    id: "6",
    title: "Digital Camera",
    price: 499,
    description: "Capture every moment in stunning HD with this high-performance digital camera. Featuring a 20MP sensor, optical zoom, and HD video recording, it is perfect for both photography enthusiasts and casual users. Compact and lightweight, it’s ideal for travel, events, and daily life. Quick and easy operation ensures you never miss a shot.",
    category: "Electronics",
    image: "/camera.jpg",
    features: ["20MP sensor", "HD video recording", "Optical zoom"],
    specs: [
      { label: "Weight", value: "450g" },
      { label: "Battery Life", value: "500 shots" },
    ],
    reviews: [
      { id: 1, user: "Aakash", rating: 5, comment: "Excellent image quality." },
    ],
  },
  {
    id: "7",
    title: "T-shirt",
    price: 29,
    description: "A classic cotton t-shirt that offers comfort and style. Made from 100% soft cotton, it provides a breathable and relaxed fit suitable for all-day wear. Easy to wash and maintain, this t-shirt is perfect for casual outings, workouts, or layering under jackets. Available in multiple sizes to ensure a perfect fit for everyone.",
    category: "Clothing",
    image: "/tshirt.jpg",
    features: ["100% cotton", "Comfortable fit", "Machine washable"],
    specs: [
      { label: "Sizes", value: "S, M, L, XL" },
      { label: "Material", value: "Cotton" },
    ],
    reviews: [
      { id: 1, user: "Ravi", rating: 5, comment: "Great fit and quality!" },
    ],
  },
  {
    id: "8",
    title: "Smartphone",
    price: 699,
    description: "Stay connected with the latest smartphone technology. Featuring a large 6.5-inch display, high-speed processor, and 128GB storage, this phone handles multitasking and media seamlessly. Long-lasting battery and fast charging ensure you stay powered throughout the day. Capture stunning photos with advanced cameras and enjoy a smooth, responsive user experience.",
    category: "Electronics",
    image: "/phone.jpg",
    features: ["6.5-inch display", "128GB storage", "Fast charging"],
    specs: [
      { label: "RAM", value: "6GB" },
      { label: "Battery", value: "4500mAh" },
    ],
    reviews: [
      { id: 1, user: "Shreya", rating: 5, comment: "Amazing phone for the price." },
    ],
  },
  {
    id: "9",
    title: "Earbuds",
    price: 59,
    description: "Enjoy wireless freedom with these compact earbuds. Featuring Bluetooth 5.0 connectivity, long battery life, and a comfortable design, they are ideal for music, calls, and workouts. Easy to carry in a pocket or bag, they deliver clear audio and deep bass for an immersive experience. Perfect for on-the-go listening anytime, anywhere.",
    category: "Electronics",
    image: "/earbuds.jpg",
    features: ["Bluetooth 5.0", "Long battery life", "Compact design"],
    specs: [
      { label: "Weight", value: "50g" },
      { label: "Battery Life", value: "8 hours" },
    ],
    reviews: [
      { id: 1, user: "Ankit", rating: 4, comment: "Good sound quality." },
    ],
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



  const checkItemInWishlist = (id) => wishlist.includes(id);



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

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-2xl font-semibold text-red-900">
              ₹{product.price}
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Features:</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

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

          <div className="mb-6">
            <div className="flex items-center">
              <div className="flex items-center border rounded-3xl shadow-md py-2 px-6 bg-gray-100 space-x-2">
                <span
                  className={`text-2xl font-bold ${avgRating >= 4 ? "text-green-900" : "text-yellow-500"
                    }`}
                >
                  {avgRating.toFixed(1)}
                </span>


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

          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={checkItemInCart(product)}

              onClick={addToCart}
              className="w-full border md:w-auto px-4 py-2 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition disabled:bg-white disabled:text-gray-400 disabled:border-gray-400"
            >
              {checkItemInCart(product) ? "Item already in cart" : "Add to Cart"}
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
                  <StarRatings
                    readOnly
                    rating={review.rating}
                    starRatedColor="red"
                    starEmptyColor="gray"
                    numberOfStars={5}
                    starDimension="20px"
                  />
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
