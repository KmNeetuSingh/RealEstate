import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-yellow-50 px-4 md:px-16 py-12 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-yellow-600 text-center mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-8 text-center text-lg">
          We'd love to hear from you! Reach out through any of the channels below.
        </p>

        <div className="flex flex-col gap-6 text-center text-lg text-gray-700">
          <p>
            📞 <span className="font-semibold">Phone:</span> +1 234 567 890
          </p>
          <p>
            📧 <span className="font-semibold">Email:</span> contact@homehunt.com
          </p>
          <p>
            📍 <span className="font-semibold">Address:</span> 123 Main Street, Your City, Country
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
