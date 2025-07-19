import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loader from './Loader/Loader';

const PromotionsSection = () => {
  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('https://server12-taupe.vercel.app/coupons');
      return res.data;
    },
  });
  if(isLoading )return <Loader/>
    return (
         <section className="bg-gray-200 mt-10 rounded-3xl py-16 px-4 mb-5 lg:px-0">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">🔥 Hot Promotions</h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Unlock special discounts with these exclusive coupon codes. Apply them during checkout!
        </p>

        <div className="grid md:grid-cols-4 gap-6 ">
          {coupons.map((promo) => (
            <div
              key={promo._id}
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