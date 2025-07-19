import React from 'react';

const WhyChoose = () => {
    return (
       <section className="bg-gray-200 mt-10 rounded-3xl py-12 px-4 md:px-16">
  <h2 className="text-3xl font-bold text-center text-primary mb-8">✨ Why Choose CourtConnect?</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
    <div className="p-6 bg-white rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
      <p className="text-gray-600 text-sm">Book courts with just a few clicks—fast, easy, and secure.</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
      <p className="text-gray-600 text-sm">All courts are reviewed for quality and safety.</p>
    </div>
    <div className="p-6 bg-white rounded-2xl shadow">
      <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
      <p className="text-gray-600 text-sm">Get the best value for your money with flexible pricing.</p>
    </div>
  </div>
</section>
    );
};

export default WhyChoose;