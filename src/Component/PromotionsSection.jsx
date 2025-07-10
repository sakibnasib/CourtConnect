import React from 'react';
const promotions = [
  {
    id: 1,
    code: 'ABC5',
    discount: '5%',
    description: 'Get 5% off on all court bookings this month.',
  },
  {
    id: 2,
    code: 'WELCOME10',
    discount: '10%',
    description: 'New members enjoy 10% off on first booking!',
  },
  {
    id: 3,
    code: 'WEEKEND15',
    discount: '15%',
    description: '15% off every weekend on squash courts!',
  },
];
const PromotionsSection = () => {
    return (
         <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">🔥 Hot Promotions</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Unlock special discounts with these exclusive coupon codes. Apply them during checkout!
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:border-primary transition"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{promo.code}</h3>
              <p className="text-lg font-semibold text-green-600 mb-1">Discount: {promo.discount}</p>
              <p className="text-gray-600">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default PromotionsSection;