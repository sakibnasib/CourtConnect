import React, { useState, useEffect } from "react";

const bannerImages = [
  "https://i.ibb.co/bj0PtCH3/basketball-court-with-wire-fence-around.jpg",
  "https://i.ibb.co/kYX7qWt/basketball-court.jpg",
  "https://i.ibb.co/rK6GCWY7/basketball-court-1.jpg",
];

const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Rotate banner images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-gray-800 font-sans">
      {/* Banner */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <img
          src={bannerImages[currentImage]}
          alt="Sports Club"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow-lg animate-fadeIn">
            Welcome to Our courtconnect
          </h1>
          <p className="text-gray-200 mt-4 text-lg max-w-2xl animate-fadeIn delay-200">
            Play. Compete. Connect. Your home for world-class courts and an active community.
          </p>
        </div>
      </div>

      {/* About the Club */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10 tracking-tight">
          About the Club
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <p className="text-lg leading-relaxed">
              Founded in 1995, our sports club has been the hub for passionate
              players across tennis, badminton, squash, and more. With premium
              facilities and expert coaching, we’re here to elevate your game.
            </p>
            <p className="text-lg leading-relaxed">
              <span className="font-semibold">Our Mission:</span> To inspire and
              enable healthy, active lifestyles through accessible, inclusive,
              and top-quality sports experiences.
            </p>
            <p className="text-lg leading-relaxed">
              From beginners to pros, we welcome all skill levels to join our
              growing community and enjoy the spirit of friendly competition.
            </p>
          </div>
          <div className="relative group">
            <img
              src="https://i.ibb.co.com/mFbhfKPn/54433-O7-ZRKZ.jpg"
              alt="Club Facilities"
              className="rounded-3xl shadow-2xl object-cover w-full h-[350px] transform group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl"></div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-10 tracking-tight">
            Our Location
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-xl font-semibold">📍 Address:</p>
              <p className="text-gray-700">
             House 55, Road 9/A, DhanmondiDhaka-1209, Bangladesh
              </p>
              <p className="text-xl font-semibold">📞 Contact:</p>
              <p className="text-gray-700">+880 1234-567890</p>
              <p className="text-gray-700">contact@courtconnect.club</p>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img
                src="https://i.ibb.co.com/jvRC0RGv/2209-w018-n002-1289a-p30-1289.jpg"
                alt="Map"
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      {/* <section className="relative py-16 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Special Promotions
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { code: "ABC", discount: "5%" },
              { code: "SPORT10", discount: "10%" },
              { code: "PLAY15", discount: "15%" },
            ].map((coupon, index) => (
              <div
                key={index}
                className="backdrop-blur-md bg-white/20 text-white rounded-2xl p-8 shadow-lg border border-white/30 transform hover:scale-105 transition duration-300"
              >
                <p className="text-2xl font-bold mb-2">
                  Coupon: {coupon.code}
                </p>
                <p className="text-lg">Save {coupon.discount} on your booking!</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
