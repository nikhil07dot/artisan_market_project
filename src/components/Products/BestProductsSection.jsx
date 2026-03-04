import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';


const products = [
  {
    id: 1,
    name: 'Serving Platter',
    description: 'Beautiful hand-crafted serving platter with a smooth finish. Ideal for presenting snacks or appetizers at gatherings. Durable and stylish design blends with rustic and modern decor.',
    price: '$35',
    image: '/images/serving-platter.jpg',
  },
  {
    id: 2,
    name: 'Ceramic Butter Dish',
    description: 'Elegant ceramic butter dish perfect for kitchen or table use. Keeps your butter fresh and spreadable. Comes with a matching lid for clean storage.',
    price: '$20',
    image: '/images/butter-dish.jpg',
  },
  {
    id: 3,
    name: 'Minimalist Clay Planter',
    description: 'Simple and sleek clay planter designed for small indoor plants. Its neutral tones and durable clay body make it perfect for any space, from desk to windowsill.',
    price: '$22',
    image: '/images/clay-planter.jpg',
  },
  {
    id: 4,
    name: 'Geometric Wall Disc',
    description: 'Modern ceramic wall disc with geometric design. Adds a touch of artistry to living rooms, bedrooms, or entryways. Lightweight and easy to mount.',
    price: '$37',
    image: '/images/wall-disc.jpg',
  },
  {
    id: 5,
    name: 'Rustic Clay Sign',
    description: 'A hand-painted rustic clay sign perfect for welcoming guests. Weather-resistant and suitable for both indoor and outdoor decor.',
    price: '$34',
    image: '/images/clay-sign.jpg',
  },
  {
    id: 6,
    name: 'Terracotta Bird Hanging',
    description: 'Adorable terracotta bird hanging that brings warmth and charm. Crafted with love, ideal for gardens or cozy corners indoors.',
    price: '$19',
    image: '/images/bird-hanging.jpg',
  },
  {
    id: 7,
    name: 'Essential Oil Roll-On',
    description: 'Convenient roll-on essential oils for daily wellness. Infused with calming natural scents to help you unwind, focus, or energize on the go.',
    price: '$12',
    image: '/images/essential-oil-rollon.jpg',
  },
  {
    id: 8,
    name: 'Handwoven Scarf',
    description: 'Cozy handwoven scarf made from sustainable fibers. Soft, breathable, and stylish — perfect for chilly mornings or layering in fall.',
    price: '$25',
    image: '/images/handwoven-scarf.jpg',
  },
  {
    id: 9,
    name: 'Bath Bomb',
    description: 'Colorful bath bomb enriched with essential oils and natural ingredients. Creates a relaxing spa-like experience with fizz and fragrance.',
    price: '$6',
    image: '/images/bath-bomb.jpg',
  },
  {
    id: 10,
    name: 'Herbal Soap Bar',
    description: 'Handcrafted herbal soap bar with a refreshing scent. Made from natural ingredients to cleanse and nourish your skin.',
    price: '$8',
    image: '/images/herbal-soap.jpg',
  },
  {
    id: 11,
    name: 'Knitted Beanie',
    description: 'Warm knitted beanie made from soft wool. Stylish and snug, it’s the perfect winter companion for outdoor adventures or casual wear.',
    price: '$20',
    image: '/images/knitted-beanie.jpg',
  },
  {
    id: 12,
    name: 'Macramé Plant Hanger',
    description: 'Artisan macramé plant hanger made with 100% cotton. Adds a boho charm to any room. Great for displaying your favorite potted plants.',
    price: '$18',
    image: '/images/macrame-plant-hanger.jpg',
  },
  {
    id: 13,
    name: 'Boho Bowl Set',
    description: 'Set of beautifully designed boho ceramic bowls. Ideal for daily use or special occasions. Each piece features a unique hand-painted pattern.',
    price: '$45.99',
    image: '/images/boho-bowl.jpg',
  },
];

const BestProductsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();

  // Update visibleCount based on window width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width >= 1440) setVisibleCount(4);
      else if (width >= 1024) setVisibleCount(3);
      else if (width >= 768) setVisibleCount(2);
      else setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const nextSlide = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex(startIndex + visibleCount);
    }
  };

  const prevSlide = () => {
    if (startIndex - visibleCount >= 0) {
      setStartIndex(startIndex - visibleCount);
    }
  };

  const handleVisitStore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/products');
  };

  const cardWidthPercent = 100 / visibleCount;

  return (
    <section className="bg-[#e8e0d7] py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-[#c59b5e] mb-4">Best Products</h2>
        <p className="text-gray-700 text-lg">Explore our top-rated handcrafted items</p>
      </div>

      <div className="relative w-full px-8 overflow-hidden">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 text-black text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition"
        >
          {'<'}
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 text-black text-xl w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-90 transition"
        >
          {'>'}
        </button>

        {/* Product Cards */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${startIndex * cardWidthPercent}%)` }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 flex flex-col"
                style={{ minWidth: `${cardWidthPercent}%` }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[280px] object-cover rounded-t-xl w-full"
                />
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <h3 className="text-xl font-bold text-[#3d3c9c]">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-6">{product.description}</p>
                  <span className="text-black font-bold text-lg mt-auto">{product.price}</span>
                </div>

                {/* Hover Button */}
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-end p-4">
                  <button
                    onClick={handleVisitStore}
                    className="bg-[#3d3c9c] hover:bg-blue-900 text-white px-4 py-2 text-sm rounded"
                  >
                    Visit Store
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestProductsSection;