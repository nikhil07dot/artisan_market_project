// ProductsPage.jsx
import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useCart } from "../Cart/CartContext";
import { useWishlist } from "../Wishlist/WishlistContext";
import { Link } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = [
  "Pottery & Clay Art",
  "Functional Ceramics",
  "Decorative Artworks",
  "Scented & Home Wellness Products",
  "Textile & Fiber Arts"
];

const CategorySection = ({
  name,
  items,
  isExpanded,
  onToggleExpand,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  scrollToNextCategory,
  showScrollTop,
  onScrollTop
}) => {
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const displayItems = isExpanded ? items : items.slice(0, 4);

  const slideIn = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.3, ease: "easeOut" } }
  };

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const handleToggle = () => {
    if (isExpanded) {
      scrollToNextCategory(name);
    } else {
      onToggleExpand(name);
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <Motion.div
      key={name}
      ref={sectionRef}
      className="mb-12 relative"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={slideIn}
    >
      <div ref={ref}>
        <h2 className="text-3xl font-bold mb-4 border-l-4 border-black pl-3">{name}</h2>

        <Motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <AnimatePresence initial={false}>
            {displayItems.map(product => (
              <Motion.div
                key={product._id}
                variants={cardAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={() => onToggleWishlist(product)}
                  isWishlisted={wishlist.some(item => item._id === product._id)}
                />
              </Motion.div>
            ))}
          </AnimatePresence>
        </Motion.div>

        {items.length > 4 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleToggle}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-md"
            >
              {isExpanded ? "View Less" : "View More"}
              <svg
                className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {showScrollTop && (
          <button
            onClick={onScrollTop}
            className="absolute right-4 bottom-4 z-10 p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition"
            title="Back to top"
          >
            ⬆
          </button>
        )}
      </div>
    </Motion.div>
  );
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { cart, addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const [toastMessage, setToastMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categoryRefs = useRef({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1); // ✅ Removed unused 'msg' param
    showToast(`${product.name} added to cart 🛒`);
  };

  const handleToggleWishlist = (product) => {
    const added = toggleWishlist(product, (msg) => {
      showToast(msg);
    });
    if (added) {
      showToast(`${product.name} added to wishlist ❤️`);
    } else {
      showToast(`${product.name} removed from wishlist 💔`);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNextCategory = (currentName) => {
    const keys = Object.keys(categoryRefs.current);
    const currentIndex = keys.indexOf(currentName);
    if (currentIndex !== -1 && currentIndex + 1 < keys.length) {
      const nextKey = keys[currentIndex + 1];
      categoryRefs.current[nextKey]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpandedCategory(null);
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProducts = categories.map(category => {
    const categoryItems = filteredProducts.filter(
      p => p.category?.trim().toLowerCase() === category.trim().toLowerCase()
    );
    return { name: category, items: categoryItems };
  }).filter(group => group.items.length > 0);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <Motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="p-10 bg-[#e8e0d7] min-h-screen relative"
    >
      <h1 className="text-5xl font-extrabold mb-10 text-center text-black tracking-tight leading-tight">
        <span className="block text-4xl sm:text-5xl md:text-6xl font-black">
          Discover Handmade Excellence
        </span>
        <span className="mt-2 block text-xl text-gray-700 font-medium">
          Curated Collection of Artisan Products
        </span>
      </h1>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or category..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 shadow-md focus:ring-2 focus:ring-black focus:outline-none text-gray-800 placeholder-gray-500 transition"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/wishlist"
            className="relative group inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white rounded-md shadow-sm hover:bg-gray-100 transition"
          >
            <span className="mr-2">❤️</span>
            Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-black text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap">
              View your saved items
            </div>
          </Link>

          <p className="text-sm text-gray-700">
            Cart:{" "}
            <span className="font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} item
              {cart.length !== 1 && "s"}
            </span>
          </p>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm font-medium">
          {toastMessage}
        </div>
      )}

      {groupedProducts.length === 0 ? (
        <div className="text-center text-gray-700 text-xl mt-20 font-medium">
          No products found.
        </div>
      ) : (
        groupedProducts.map(({ name, items }) => {
          categoryRefs.current[name] = categoryRefs.current[name] || React.createRef();
          return (
            <div ref={(el) => (categoryRefs.current[name] = el)} key={name}>
              <CategorySection
                name={name}
                items={items}
                isExpanded={expandedCategory === name}
                onToggleExpand={setExpandedCategory}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                scrollToNextCategory={scrollToNextCategory}
                showScrollTop={expandedCategory === name}
                onScrollTop={scrollToTop}
              />
            </div>
          );
        })
      )}
    </Motion.div>
  );
};

export default ProductsPage;
