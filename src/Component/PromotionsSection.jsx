import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const PromotionsSection = () => {
  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:3000/admin/coupons');
      return res.data;
    },
  });
  if(isLoading )return <p>Loding</p>
    return (
         <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4 lg:px-0">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">🔥 Hot Promotions</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Unlock special discounts with these exclusive coupon codes. Apply them during checkout!
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {coupons.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:border-primary transition"
            >
              <h3 className="text-2xl font-bold text-primary mb-2">{promo.code}</h3>
              <p className="text-lg font-semibold text-green-600 mb-1">Discount: {promo.discount}%</p>
              <p className="text-gray-600">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default PromotionsSection;