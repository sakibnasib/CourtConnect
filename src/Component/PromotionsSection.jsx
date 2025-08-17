// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React from 'react';
// import Loader from './Loader/Loader';

// const PromotionsSection = () => {
//   // Fetch all coupons
//   const { data: coupons = [], isLoading } = useQuery({
//     queryKey: ['coupons'],
//     queryFn: async () => {
//       const res = await axios.get('https://server12-taupe.vercel.app/coupons');
//       return res.data;
//     },
//   });
//   if(isLoading )return <Loader/>
//     return (
//          <section className="bg-gray-200 mt-10 rounded-3xl py-16 px-4 mb-5 lg:px-0">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-primary mb-4">🔥 Hot Promotions</h2>
//         <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
//           Unlock special discounts with these exclusive coupon codes. Apply them during checkout!
//         </p>

//         <div className="grid md:grid-cols-4 gap-6 ">
//           {coupons.map((promo) => (
//             <div
//               key={promo._id}
//               className="bg-white rounded-xl shadow-lg p-6 border border-blue-200 hover:border-primary transition"
//             >
//               <h3 className="text-2xl font-bold text-primary mb-2">{promo.code}</h3>
//               <p className="text-lg font-semibold text-green-600 mb-1">Discount: {promo.discount}%</p>
//               <p className="text-gray-600">{promo.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//     );
// };

// export default PromotionsSection;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loader from './Loader/Loader';
import { Copy, Tag } from 'lucide-react';

const PromotionsSection = () => {
  // Fetch all coupons
  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axios.get('https://server12-taupe.vercel.app/coupons');
      return res.data;
    },
  });

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  if (isLoading) return <Loader />;

  return (
    <section className="relative bg-gray-200 mt-12 rounded-3xl py-20 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 drop-shadow-sm">
          🔥 Hot Promotions
        </h2>
        <p className="text-lg text-gray-700 mb-14 max-w-2xl mx-auto">
          Unlock special discounts with these exclusive coupon codes. Apply them during checkout!
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {coupons.map((promo) => (
            <div
              key={promo._id}
              className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-blue-100 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
            >
              {/* Badge */}
              <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Tag size={14} /> Promo
              </div>

              {/* Coupon Code */}
              <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2">
                {promo.code}
                <button
                  onClick={() => handleCopy(promo.code)}
                  className="p-3 rounded-full hover:bg-blue-100 transition"
                  title="Copy code"
                >
                  <Copy size={16} className="text-blue-600" />
                </button>
              </h3>

              {/* Discount */}
              <p className="text-lg font-semibold text-green-600 mb-2">
                🎁 {promo.discount}% OFF
              </p>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {promo.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative background shapes */}
      <div className="absolute -top-24 -left-24 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-28 -right-20 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
    </section>
  );
};

export default PromotionsSection;
