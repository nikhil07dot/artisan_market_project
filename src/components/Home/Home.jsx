import React, { useEffect, useState } from 'react';
import pot2 from '../../assets/pot2.png';
import pot5 from '../../assets/pot5.jpg';
import ProductCarousel from '../Products/ProductCarousel';
import BestProductsSection from '../Products/BestProductsSection';
import { motion as Motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-[#3d3c9c] text-white p-3 rounded-full shadow-lg hover:bg-blue-900 transition-all z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    )
  );
};

const HomePage = () => {
  return (
    <main className="w-full  overflow-x-hidden bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        {/* Background Image */}
        <img
          src={pot5}
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

        {/* Hero Text */}
        <Motion.div
          className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-[900px]">   
            <p
              className="font-bold mb-6 text-[48px] max-[1024px]:text-3xl max-[768px]:text-2xl max-[425px]:text-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: '1.3' }}
            >
              Elevate your space with handcrafted artistry — curated collections from global artisans, each piece telling a story of passion and craftsmanship.
            </p>
            <Motion.a
              whileHover={{ scale: 1.05 }}  
              whileTap={{ scale: 0.95 }}
              href="/products"
              className="inline-block text-2xl bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded transition"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              SHOP NOW!
            </Motion.a>   
          </div>       
        </Motion.div>  
      </section>

      {/* About Section */}
      <section className="bg-[#e8e0d7] py-20 px-4 relative z-20">
        <Motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}    
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#c59b5e] mb-6">Featured Products</h2>
          <a
            href="/products"
            className="inline-block text-lg mt-2 bg-[#3d3c9c] hover:bg-blue-900 text-white font-medium px-6 py-3 rounded-md"
          >
           Show More Products
          </a>
        </Motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <Motion.img
            src={pot2}
            alt="Pottery Vases"
            className="w-full max-w-[600px] rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />

          <Motion.div
            className="bg-gray-100 rounded-full aspect-square w-full max-w-[550px] flex flex-col justify-center items-center p-8 text-center shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#3d3c9c] mb-4">About Artisan Market</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              ArtisanMarket connects you with independent creators to explore and purchase handcrafted, unique goods.
              We champion authenticity, creativity, and the makers who bring beauty to everyday life.
            </p>
            <a
              href="/about"
              className="mt-4 bg-[#3d3c9c] hover:bg-blue-900 text-white font-medium px-5 py-2 text-base rounded-md"
            >
              Read More
            </a>
          </Motion.div>
        </div>
      </section>

      {/* Carousel */}
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <ProductCarousel />
      </Motion.div>

      {/* Best Products */}
      <Motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <BestProductsSection />
      </Motion.div>

      {/* Scroll to Top */}
      <ScrollToTopButton />
    </main>
  );
};

export default HomePage;
 