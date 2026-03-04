import React, { useState } from 'react';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import AuthButton from '../Auth/AuthButton';


export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black shadow-md top-0 py-5 z-50 w-full">
      {/* Container */}
      <div className="max-w-[1440px] mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div
          className="
            text-4xl text-white tracking-widest -mx-52 font-medium flex items-center
            max-[1440px]:text-3xl max-[1440px]:mx-0
            max-[1024px]:text-2xl
            max-[768px]:text-xl
          "
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Artisan <span>Market</span>
          <span className="text-green-700">🌿</span>
        </div>

        {/* Hamburger Icon (Mobile only) */}
        <div
          className="text-white text-2xl cursor-pointer md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Navigation (≥768px only) */}
        <nav className="text-lg hidden -mx-48
          md:flex gap-10 text-white font-medium max-[768px]:text-sm tracking-wide 
          max-[1440px]:gap-8 max-[1440px]:mx-0
          max-[1024px]:gap-5 max-[1024px]:text-sm max-[1024px]:
        ">
          <a href="/" className="hover:text-[#a1724d]">Home</a>
          <a href="/products" className="hover:text-[#a1724d]">Products</a>
          <a href="/contact" className="hover:text-[#a1724d]">Contact</a>
          <a href="/about" className="hover:text-[#a1724d]">About</a>
          <AuthButton />
          <a href="/cart" className="flex items-center hover:text-[#a1724d]">
            <FaShoppingCart className="text-base size-6" />
          </a>
        </nav>
      </div>

      {/* Mobile Navigation Menu (≤768px only) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-center bg-black text-white text-lg tracking-widest uppercase">
          <a href="/" className="hover:text-[#a1724d]">Home</a>
          <a href="/products" className="hover:text-[#a1724d]">Products</a>
          <a href="/contact" className="hover:text-[#a1724d]">Contact</a>
          <a href="/about" className="hover:text-[#a1724d]">About</a>
          <div className="flex justify-center">
            <AuthButton />
          </div>
          <a href="#" className="flex justify-center items-center hover:text-[#a1724d]">
            <FaShoppingCart className="text-sm size-6" />
          </a>
        </div>
      )}
    </header>
  );
}
