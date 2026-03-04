import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import pc1 from "../../assets/pc1.jpg";
import pc2 from "../../assets/pc2.jpg";
import pc3 from "../../assets/pc3.jpg";
import pc4 from "../../assets/pc4.jpg";

const products = [
  {
    id: 1,
    title: "Handcrafted Pottery",
    description: "Each piece tells a unique artisan story.",
    image: pc1,
  },
  {
    id: 2,
    title: "Decorative Ceramic",
    description: "Elegant design for modern homes.",
    image: pc2,
  },
  {
    id: 3,
    title: "Earthy Vases",
    description: "Sustainably made, naturally beautiful.",
    image: pc3,
  },
  {
    id: 4,
    title: "Boho Bowl Set",
    description: "Colorful and perfect for gatherings.",
    image: pc4,
  },
];

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % products.length),
    onSwipedRight: () => setCurrent((prev) => (prev - 1 + products.length) % products.length),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <section
      {...swipeHandlers}
      className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden"
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-600 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${product.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full h-full bg-black/40 flex items-center justify-center px-6">
            <div className="text-white text-center max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
                {product.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                {product.description}
              </p>
              <a
                href="/products"
                className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-md transition"
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition duration-600 ${
              current === index ? "bg-blue-800" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
