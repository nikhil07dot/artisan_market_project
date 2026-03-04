import React from "react";
import ai1 from '../../assets/ai1.jpg';
import ai2 from '../../assets/ai2.jpg';
import ai3 from '../../assets/ai3.jpg';
import ai4 from '../../assets/ai4.jpg';
import { motion as Motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-[#e8e0d7] text-gray-800">

      {/* PAGE HEADING */} 
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-4">
        <h1 className="text-5xl font-bold text-center">About Us</h1>
      </div>

      {/* SECTION 1 - The Meaning of Artisan */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-start">
          <div className="mb-10">  
            <h2 className="text-4xl font-bold mb-6">The Meaning of Artisan</h2>
            <p className="text-lg mb-4"> 
              The word “artisan” traces back centuries, symbolizing craftsmanship, care, and creativity. At Artisan Market, we celebrate the hands that mold, paint, sculpt, and design each product with passion and purpose.
            </p> 
            <p className="text-lg"> 
              Our platform bridges the gap between traditional craft and modern commerce—empowering clayworkers and artists to share their work with a global audience while preserving culture and authenticity.
            </p>
          </div>
          <div>  
            <img src={ai1} alt="Artisan Working" className="rounded-xl shadow-lg w-full" />
          </div>
        </div>
      </section>

      <div className="border-t border-black my-10 max-w-3xl mx-auto"></div>

      {/* SECTION 2 - Our Vision */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg mb-4">
            Our vision is to bring the world of handmade, soulful art into every home—to create a space where stories are told through clay, color, and craft.
          </p>
          <p className="text-lg">
            We believe that art should be accessible and creators should be celebrated. Our platform connects creators and collectors while cultivating a deep appreciation for artisan heritage.
          </p>
        </div>
        <div>
          <img src={ai2} alt="Vision Image" className="rounded-xl shadow-lg w-full" />
        </div>
      </section>

      {/* SECTION 3 - Our Path to Success */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Path to Success</h2>
          <p className="text-lg mb-4">
            From a small collective of potters and painters, we have grown into a vibrant community of over 500+ artisans across the country. Through dedication, ethical sourcing, and a love for storytelling, our journey continues.
          </p>
          <p className="text-lg">
            Each milestone is a celebration of creativity and community—driven by our mission to bring art into everyday lives while ensuring fair opportunities for every artist.
          </p>
        </div>
        <div>
          <img src={ai3} alt="Success Path" className="rounded-xl shadow-lg w-full" />
        </div>
      </section>

      <div className="border-t border-black my-10 max-w-3xl mx-auto"></div>

      {/* SECTION 4 - Our Story */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Story</h2>
        <p className="text-lg mb-4">
          It all started in 2021 with a belief that handmade crafts hold stories, emotions, and heritage. Our founders, driven by a love for traditional Indian art and sustainable practices, envisioned a marketplace that supports real artisans.
        </p>
        <p className="text-lg mb-4">
          Amid a fast-paced digital world, we aimed to slow things down—to spotlight the human behind the product. Our journey continues with every piece that finds a new home and every artist that finds a new stage.
        </p>
        <img src={ai4} alt="Our Story" className="rounded-xl shadow-lg mx-auto mt-8 w-full max-w-2xl" />
      </section>

      {/* SECTION 5 - Journey Timeline */}
      <section className="py-20 px-6 bg-[#e8e0d7]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Journey</h2>
          <div className="relative border-l-4 border-[#3d3c9c] pl-8 space-y-12">
            {[{ year: "2021", event: "Launched with 10 artisans" }, { year: "2022", event: "Reached 100+ creators" }, { year: "2023", event: "Featured in national press" }, { year: "2024", event: "Expanded globally with 500+ artisans" }].map((item, index) => (
              <Motion.div key={index} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                <div className="text-[#3d3c9c] font-bold text-lg">{item.year}</div>
                <p className="text-gray-700 text-base">{item.event}</p>
              </Motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 - Testimonials */}
      <section className="bg-[#3d3c9c] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white text-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">“The pottery I bought was stunning. You can feel the soul in it.”</p>
              <h4 className="font-bold">– Aditi Kapoor</h4>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">“An incredible marketplace that connects culture with quality.”</p>
              <h4 className="font-bold">– Kevin Das</h4>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded shadow">
              <p className="italic mb-4">“I loved the story behind the product. Beautiful work!”</p>
              <h4 className="font-bold">– Sana Mehra</h4>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - Embedded Video */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Behind the Scenes</h2>
          <p className="text-lg mb-8">See how our artisans bring each piece to life with passion and precision.</p>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              title="Artisan Process"
              className="w-full h-full rounded-xl shadow-lg"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
