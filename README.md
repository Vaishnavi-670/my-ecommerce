🛍️ My E-Commerce

An elegant and responsive E-Commerce web application built with Next.js, Tailwind CSS, and Framer Motion.
The project implements product listings, filtering, search, cart functionality, and product details — all optimized for desktop, tablet, and mobile.

🌐 Live Demo: my-ecommerce-rouge-one.vercel.app

✨ Features

Home Page (Product Listing)
Category, price range, and brand filters
Search bar with live filtering
Responsive product grid (3 / 2 / 1 columns based on screen size)
Quick "Add to Cart" functionality
Product Detail Page
Dynamic routing: /product/[id]
Large product image / carousel

Product details: title, price, description, category
Quantity selector + Add to Cart button

Optional reviews section

Cart Page
List of added products
Quantity update controls
Remove items from cart
Price summary

Other Functionalities

Client-side state management (React Context / Zustand / Redux)
Smooth animations with Framer Motion

🛠 Tech Stack

Frontend Framework: Next.js 15
Styling: Tailwind CSS
Animations: Framer Motion
Icons: React Icons, Lucide React
Toasts: React Hot Toast
Ratings: React Star Ratings

⚙️ Installation

Clone the repository:

git clone https://github.com/Vaishnavi-670/my-ecommerce.git
cd my-ecommerce
Install dependencies:
npm install

Run the development server:
npm run dev
Open http://localhost:3000 to view it in your browser.

🚀 Usage
Browse products from the home page.
Apply filters (category, price, brand) and search.
Click on a product to view details.
Add items to the cart (persisted in localStorage).
View the cart page and manage quantities or remove items.

🖼 Pages & Layout

Home Page / – Product listing with filters, search, and responsive grid.
Product Detail Page /product/[id] – Detailed product info with dynamic routing.
Cart Page /cart – Added items, price summary, and quantity management.

⚡ Configuration
If you plan to extend the project:
Update product data source (static JSON, API, or database).
Configure environment variables in .env.local (if using external APIs).
Adjust Tailwind config for custom themes or colors.

Contributors
Vaishnavi – Developer & Designer
👩‍💻 Contributors

Vaishnavi – Developer & Designer
