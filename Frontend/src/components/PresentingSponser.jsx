import React from "react";

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      title: "Greenmark Developers",
      subtitle: "Presenting Sponsor",
      price: "₹3,65,00,000",
      rate: "₹9,900/Sq ft*",
      tag1: "UNDER CONSTRUCTION",
      tag2: "PRESENTING SPONSOR",
      imgUrl:
        "https://homehunt.co.in/wp-content/uploads/2023/06/Corona-Camera018-758x564.jpg",
    },
    {
      id: 2,
      title: "Skyline Ventures",
      subtitle: "Associate Sponsor",
      price: "₹2,40,00,000",
      rate: "₹7,500/Sq ft*",
      tag1: "READY TO MOVE",
      tag2: "ASSOCIATE SPONSOR",
      imgUrl:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1469&q=80",
    },
    {
      id: 3,
      title: "Sunshine Builders",
      subtitle: "Official Partner",
      price: "₹1,90,00,000",
      rate: "₹6,800/Sq ft*",
      tag1: "BOOKING OPEN",
      tag2: "OFFICIAL PARTNER",
      imgUrl:
        "https://homehunt.co.in/wp-content/uploads/2023/06/CoronaCamera002-east-1-758x564.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      {sponsors.map((sponsor) => (
        <div key={sponsor.id} className="max-w-5xl mx-auto mb-16">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center mb-2">{sponsor.subtitle}</h2>
          <p className="text-gray-600 text-center mb-4">{sponsor.title}</p>

          {/* Image Card */}
          <div className="relative rounded-none overflow-hidden shadow-lg">
            <img
              src={sponsor.imgUrl}
              alt={sponsor.title}
              className="w-full h-[22rem] sm:h-[26rem] md:h-[30rem] object-cover"
              loading="lazy"
            />

            {/* Top Right Tags */}
            <div className="absolute top-4 right-4 flex flex-wrap gap-2">
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                {sponsor.tag1}
              </span>
              <span className="bg-black text-white text-xs px-2 py-1 rounded">
                {sponsor.tag2}
              </span>
            </div>

            {/* Bottom Left Price Info */}
            <div className="absolute bottom-4 left-4 text-white bg-black/50 p-3 rounded-md">
              <p className="text-lg font-medium">
                Starting from <strong>{sponsor.price}</strong>
              </p>
              <p className="text-sm">{sponsor.rate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sponsors;
