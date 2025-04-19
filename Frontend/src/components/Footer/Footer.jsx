import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaChevronUp,
} from "react-icons/fa";

const Footer = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-white relative">
      {/* Top Contact Section */}
      <div className="bg-[#59575e] px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">Home Hunt</p>
            <a
              href="https://maps.google.com/?q=Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-2 hover:underline"
            >
              <FaMapMarkerAlt /> Hyderabad
            </a>
            <a
              href="mailto:info@homehunt.co.in"
              className="flex items-center gap-2 hover:underline"
            >
              <FaEnvelope /> info@homehunt.co.in
            </a>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe for Updates</h3>
            <p className="text-sm mb-3">Stay updated with our latest properties and offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded text-black w-full focus:outline-none"
              />
              <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav & Social */}
      <div className="bg-yellow-400 text-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Left Text */}
          <p className="text-sm text-center sm:text-left">
            © HomeHunt - All rights reserved | A Wingman Brandworks Initiative
          </p>

          {/* Navigation + Social */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Contact</a>
            <span>[digits-popup id=22515]</span>
            <a href="#" className="text-gray-800 hover:text-black text-lg"><FaFacebook /></a>
            <a href="#" className="text-gray-800 hover:text-black text-lg"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#59575e] text-white p-3 rounded shadow-lg hover:bg-gray-700 transition-all z-50"
          aria-label="Scroll to Top"
        >
          <FaChevronUp />
        </button>
      )}
    </footer>
  );
};

export default Footer;
