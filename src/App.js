import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Black Puffer Jacket",
    price: 120,
    image: "https://via.placeholder.com/300x400?text=Black+Puffer+Jacket",
  },
  {
    id: 2,
    name: "Navy Puffer Jacket",
    price: 110,
    image: "https://via.placeholder.com/300x400?text=Navy+Puffer+Jacket",
  },
  {
    id: 3,
    name: "Red Puffer Jacket",
    price: 130,
    image: "https://via.placeholder.com/300x400?text=Red+Puffer+Jacket",
  },
];

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [showSignup, setShowSignup] = useState(() => !localStorage.getItem("user"));
  const [auth, setAuth] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const [showCartPage, setShowCartPage] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We will get back to you soon.");
    setContactForm({ name: "", email: "", message: "" });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    if (name && email) {
      const user = { name, email };
      localStorage.setItem("user", JSON.stringify(user));
      setAuth(user);
      setShowSignup(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  if (showSignup) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 text-white">
        <form
          onSubmit={handleSignup}
          className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up (Optional)</h2>
          <input name="name" placeholder="Name" className="mb-3 p-2 border rounded w-full" required />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="mb-3 p-2 border rounded w-full"
            required
          />
          <button type="submit" className="w-full bg-black text-white py-2 rounded mb-2">
            Sign Up
          </button>
          <button
            type="button"
            className="w-full text-gray-600 underline"
            onClick={() => setShowSignup(false)}
          >
            Skip
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1608889174117-3ed45a6baad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <nav className="bg-black bg-opacity-80 p-4 text-center text-white font-semibold shadow-md">
        <ul className="flex justify-center gap-6">
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              setSelectedProduct(null);
              setShowCartPage(false);
            }}
          >
            Home
          </li>
          <li
            className="hover:underline cursor-pointer"
            onClick={() => {
              setSelectedProduct(null);
              setShowCartPage(false);
            }}
          >
            Store
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setShowCartPage(true)}>
            Cart ({cart.length})
          </li>
        </ul>
      </nav>

      <main className="flex-grow p-6 space-y-10">
        <motion.header
          className="text-center space-y-2 bg-black bg-opacity-70 p-4 rounded-xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl font-bold">Cameron's Store</h1>
          <p className="text-lg text-gray-300">Welcome, {auth?.name || "Guest"}</p>
        </motion.header>

        {showCartPage ? (
          <motion.section
            className="bg-black bg-opacity-70 p-6 rounded-xl max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold">Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                <div className="text-right font-bold text-lg pt-4">Total: ${cartTotal}</div>
                <button className="w-full bg-white text-black hover:bg-gray-300 py-2 rounded">
                  Checkout
                </button>
              </div>
            )}
          </motion.section>
        ) : selectedProduct ? (
          <motion.div
            className="max-w-md mx-auto space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="mb-4 bg-white text-black hover:bg-gray-200 py-2 px-4 rounded"
            >
              ← Back to Store
            </button>
            <div className="p-4 space-y-4 bg-white text-black rounded-xl shadow">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full rounded-xl"
              />
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <p className="text-xl text-green-600">${selectedProduct.price}</p>
              <button
                className="w-full bg-black text-white hover:bg-gray-800 py-2 rounded"
                onClick={() => addToCart(selectedProduct)}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.section
            className="bg-black bg-opacity-70 p-6 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="cursor-pointer hover:shadow-xl bg-white text-black rounded-xl overflow-hidden shadow-lg"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="p-4 space-y-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full rounded-xl"
                      />
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-green-600 font-bold">${product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Form */}
        <motion.section
          className="bg-black bg-opacity-70 p-6 rounded-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 rounded text-black"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 rounded text-black"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              required
            />
            <textarea
              placeholder="Message"
              className="w-full p-2 rounded text-black"
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              required
              rows={4}
            />
            <button
              type="submit"
              className="w-full bg-white text-black py-2 rounded hover:bg-gray-300"
            >
              Send Message
            </button>
          </form>
        </motion.section>
      </main>

      <footer className="bg-black bg-opacity-80 text-gray-400 text-center p-4">
        &copy; 2025 Cameron's Store. All rights reserved.
      </footer>
    </div>
  );
}