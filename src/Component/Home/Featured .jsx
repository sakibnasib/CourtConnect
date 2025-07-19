import React from 'react';

const Featured  = () => {
    return (
       <section className="bg-gray-200 py-12 mt-10 rounded-3xl px-4 md:px-16">
  <h2 className="text-3xl font-bold text-center text-primary mb-8">🏆 Featured Courts</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Card 1 */}
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src="https://i.ibb.co/XfJSGDSD/download-11.jpg" alt="Tennis Court" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">Grand Arena</h3>
        <p className="text-gray-600 text-sm">Located in downtown, open 24/7.</p>
      </div>
    </div>
    {/* Card 2 */}
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src="https://i.ibb.co/pj3jnb7B/download-10.jpg" alt="Basketball Court" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">Sky Sports Court</h3>
        <p className="text-gray-600 text-sm">Great lighting and premium turf.</p>
      </div>
    </div>
    {/* Card 3 */}
    <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img src="https://i.ibb.co/gX8Bjfc/download-12.jpg" alt="Badminton Court" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">Pro Badminton Arena</h3>
        <p className="text-gray-600 text-sm">Professional courts with AC facility.</p>
      </div>
    </div>
  </div>
</section>
    );
};

export default Featured ;