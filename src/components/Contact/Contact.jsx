import React from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { motion as Motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    toast.loading("Sending message...");
    // Simulate async sending
    setTimeout(() => {
      toast.dismiss();
      toast.success("Message sent successfully!");
      reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#e8e0d7] px-4 py-16 flex items-center justify-center">
      <Toaster position="top-right" />
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white"
      >
        {/* Form Section */}
        <div className="p-10">
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-gray-900 mb-4"
          >
            Contact Us
          </Motion.h2>   
          <p className="text-gray-600 mb-10">We’ll get back to you as soon as possible!</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
               <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Name"
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-black text-gray-800 placeholder-gray-500"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="w-full border-b-2 border-gray-300 py-2 focus:outline-none focus:border-black text-gray-800 placeholder-gray-500"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <textarea
                placeholder="Message"
                className="w-full border-b border-gray-300 py-2 text-gray-800 focus:outline-none focus:border-black placeholder-gray-500 h-40 resize-none overflow-y-auto"
              ></textarea>

              {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
            </div>

            <Motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-44 bg-black text-white py-3 px-6 rounded-full uppercase tracking-wide hover:bg-gray-800 transition-all"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Motion.button>
          </form>
        </div>

        {/* Info Panel */}
        <Motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black text-white p-12 flex flex-col justify-center"
        >
          <h3 className="text-4xl font-semibold mb-10">Reach Us</h3>
          <div className="space-y-8 text-sm">
            <div className="flex items-center space-x-4">
              <FiMail className="text-lg" />
              <span>nikhilprasannan19@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FiPhone className="text-lg" />
              <span>+91 91731 98060</span>
            </div>
            <div className="flex items-center space-x-4">
              <FiMapPin className="text-lg" />
              <span>M.Square Dindoli, Surat</span>
            </div>
            <div className="flex items-center space-x-4">
              <FiClock className="text-lg" />
              <span>Mon - Fri: 9:00 - 18:00</span>
            </div>
          </div>
        </Motion.div>
      </Motion.div>
    </div>
  );
};

export default Contact;
