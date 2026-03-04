import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#ebd8c2] text-[#2b2b2b] pt-12 pb-6 px-4 sm:px-6 md:px-10 border-t">
      {/* Top Grid Section */}
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        {/* Shop & Discover */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4">Shop & Discover</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-base sm:text-lg">Browse Collections</a></li>
            <li><a href="#" className="text-base sm:text-lg">Reviews</a></li>
          </ul>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4">Popular Categories</h3>
          <ul className="space-y-2">
            <li><a href="/products" className="text-base sm:text-lg">Arts</a></li>
            <li><a href="/products" className="text-base sm:text-lg">Pottery</a></li>
          </ul>
        </div>

        {/* Get to Know Us */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4">Get to Know Us</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="text-base sm:text-lg">About Us</a></li>
            <li><a href="/contact" className="text-base sm:text-lg">Contact Us</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-base sm:text-lg">Terms of Service</a></li>
            <li><a href="#" className="text-base sm:text-lg">Privacy Policy</a></li>
            <li><a href="#" className="text-base sm:text-lg">Seller Policies</a></li>
            <li><a href="#" className="text-base sm:text-lg">Buyer Policies</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <a href="https://www.facebook.com/nikhil.prasannan.10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base sm:text-lg">
                <FaFacebook className="text-xl" /> Facebook
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://www.instagram.com/nikhiil__7/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base sm:text-lg">
                <FaInstagram className="text-xl" /> Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <a href="https://twitter.com/@nikhil___0001" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-base sm:text-lg">
                <FaTwitter className="text-xl" /> Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="text-lg sm:text-xl font-medium tracking-wide text-[#4e2b1a] flex items-center justify-center" style={{ fontFamily: "'Cinzel', serif" }}>
          Artisan <span className="text-[#5b3a29] ml-1">Market</span> <span className="text-green-700 ml-1">🌿</span>
        </div>
        <div className="text-sm text-gray-600">
          © 2025 ArtisanMarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
