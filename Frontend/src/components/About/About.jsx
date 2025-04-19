import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-center pt-10 px-6 md:px-20">
      {/* Header background section */}
      <div
        className="w-full h-[250px] bg-cover bg-center flex items-center justify-center text-white text-3xl font-semibold"
        style={{
          backgroundImage: `url('/src/assets/about-bg.png')`, // replace with your actual image path
        }}
      >
        About Us
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold mt-10 text-gray-800 sm:text-3xl md:text-4xl lg:text-5xl">HOMEHUNT</h1>
      <div className="w-20 h-1 border-b-2 border-dotted border-gray-400 mx-auto my-4" />

      {/* Content */}
      <div className="max-w-4xl mx-auto text-gray-700 text-left leading-relaxed">
        <p className="mb-4 text-sm sm:text-base md:text-lg">
          Home Hunt was born with their underlying motto of bridging the gap between home buyers and sellers.
          It is designed to offer customers improved access to the home of their dreams.
          In a bid to do so, we have partnered with the top builders of Hyderabad, who showcase their various
          projects present in different parts of the city. What’s more, it is easy, simple and straightforward.
          It is therefore, a better way to provide homes.
        </p>

        <p className="mb-4 text-sm sm:text-base md:text-lg">
          At Home Hunt, we understand the challenges of finding a home matching your unique and distinct needs.
          It is our way of helping you realize your dreams. This is why we believe in adopting a personal approach
          to understand client needs and serve them accordingly. We build long term relationships and keep in
          touch with our clients until we lead them to their destination.
        </p>

        <p className="mb-8 text-sm sm:text-base md:text-lg">
          Another belief nurtured at Home Hunt is that inspired teams provide excellent customer service.
          Thanks to this belief, we have managed to satisfy all our clients. We intend to make it easier for you
          to choose what you like and make the most challenging decision of your life effortless and uncomplicated.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-6 mb-16">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white p-3 rounded-full text-xl sm:text-2xl md:text-3xl"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-3 rounded-full text-xl sm:text-2xl md:text-3xl"
        >
          <FaInstagram />
        </a>
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full text-xl sm:text-2xl md:text-3xl"
        >
          <FaWhatsapp />
        </a>
      </div>
    </div>
  );
};

export default About;
