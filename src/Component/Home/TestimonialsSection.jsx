// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const testimonials = [
//   { name: "Sarah Thompson", role: "Club Member", text: "Booking courts has never been easier!", image: "/assets/member1.jpg" },
//   { name: "James Wilson", role: "Tennis Coach", text: "The club’s facilities are top-notch.", image: "/assets/member2.jpg" },
//   { name: "Emily Carter", role: "Badminton Player", text: "I love the community here.", image: "/assets/member3.jpg" },
//   { name: "Michael Lee", role: "Squash Enthusiast", text: "The booking system is very organized.", image: "/assets/member4.jpg" },
//   { name: "Rachel Adams", role: "Member", text: "Clean courts, friendly staff, and smooth online booking.", image: "/assets/member5.jpg" },
//   { name: "David Parker", role: "Club Member", text: "Payments are quick and secure.", image: "/assets/member6.jpg" },
//   { name: "Olivia Brown", role: "Tennis Player", text: "Real-time availability makes planning easy.", image: "/assets/member7.jpg" },
// ];

// const TestimonialsSection = () => {
//   return (
//     <section className="bg-base-200 py-16 px-4 sm:px-6 lg:px-8 mb-10">
//       <div className="container mx-auto max-w-6xl text-center">
//         {/* Header */}
//         <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-3">
//           🏅 What CourtConnect Members Say
//         </h2>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
//           Hear from our members about how CourtConnect makes booking sports courts seamless and fun.
//         </p>

//         {/* Swiper */}
//         <Swiper
//           modules={[Pagination, Autoplay, Navigation]}
//           spaceBetween={24}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 2, spaceBetween: 20 },
//             1024: { slidesPerView: 3, spaceBetween: 24 },
//           }}
//           pagination={{ clickable: true, dynamicBullets: true }}
//           navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
//           autoplay={{ delay: 4000, disableOnInteraction: false }}
//           loop={true}
//           className="py-6"
//           style={{
//             "--swiper-pagination-color": "#2563eb",
//             "--swiper-pagination-bullet-inactive-color": "#c7d2fe",
//             "--swiper-pagination-bullet-inactive-opacity": "0.6",
//             "--swiper-navigation-color": "#2563eb",
//           }}
//         >
//           {testimonials.map((t, i) => (
//             <SwiperSlide key={i} className="flex">
//               <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 border border-blue-100 flex flex-col h-full min-h-[280px]">
                
//                 {/* Testimonial Text */}
//                 <p className="text-gray-700 italic mb-4 flex-grow text-center">{t.text}</p>

//                 {/* User Info */}
//                 <div className="flex items-center justify-center gap-3 mt-auto">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="w-14 h-14 rounded-full object-cover border-2 border-blue-300 shadow-sm"
//                     onError={(e) => {
//                       e.target.src = "https://placekitten.com/100/100";
//                     }}
//                   />
//                   <div className="text-left">
//                     <h4 className="text-gray-800 font-semibold text-sm sm:text-base">{t.name}</h4>
//                     <p className="text-gray-500 text-xs sm:text-sm">{t.role}</p>
//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Navigation */}
//         <div className="swiper-button-prev !text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-blue-50 transition-colors duration-300"></div>
//         <div className="swiper-button-next !text-blue-600 !w-10 !h-10 !bg-white !rounded-full !shadow-lg hover:!bg-blue-50 transition-colors duration-300"></div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection;



import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const testimonials = [
  { name: "Sarah Thompson", role: "Club Member", text: "Booking courts has never been easier!", image: "/assets/member1.jpg", rating: 5 },
  { name: "James Wilson", role: "Tennis Coach", text: "The club’s facilities are top-notch.", image: "/assets/member2.jpg", rating: 4 },
  { name: "Emily Carter", role: "Badminton Player", text: "I love the community here.", image: "/assets/member3.jpg", rating: 5 },
  { name: "Michael Lee", role: "Squash Enthusiast", text: "The booking system is very organized.", image: "/assets/member4.jpg", rating: 4 },
  { name: "Rachel Adams", role: "Member", text: "Clean courts, friendly staff, and smooth online booking.", image: "/assets/member5.jpg", rating: 5 },
  { name: "David Parker", role: "Club Member", text: "Payments are quick and secure.", image: "/assets/member6.jpg", rating: 5 },
  { name: "Olivia Brown", role: "Tennis Player", text: "Real-time availability makes planning easy.", image: "/assets/member7.jpg", rating: 4 },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 px-4 mt-10 mb-10 rounded-3xl sm:px-6 lg:px-8 overflow-hidden bg-gray-200">
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-5 drop-shadow-sm"
        >
          🏅 What CourtConnect Members Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-700 max-w-2xl mx-auto mb-16"
        >
          Hear from our members about how CourtConnect makes booking sports courts seamless and fun.
        </motion.p>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="pb-20"
          style={{
            "--swiper-pagination-color": "#2563eb",
            "--swiper-pagination-bullet-inactive-color": "#dbeafe",
            "--swiper-pagination-bullet-inactive-opacity": "0.6",
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 border border-blue-100 flex flex-col h-full min-h-[340px]"
              >
                <Quote className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                <p className="text-gray-800 italic mb-6 flex-grow text-center leading-relaxed">{t.text}</p>

                {/* Star Rating */}
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-5 h-5 ${idx < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                  ))}
                </div>

                {/* User Info */}
                <div className="flex items-center justify-center gap-4 mt-auto">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
                    onError={(e) => {
                      e.target.src = "https://placekitten.com/100/100";
                    }}
                  />
                  <div className="text-left">
                    <h4 className="text-gray-900 font-semibold text-base">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="swiper-button-prev !flex !items-center !justify-center !text-white !w-12 !h-12 !bg-gradient-to-r !from-blue-500 !to-indigo-600 !rounded-full !shadow-2xl hover:scale-110 transition-transform duration-300"></div>
        <div className="swiper-button-next !flex !items-center !justify-center !text-white !w-12 !h-12 !bg-gradient-to-r !from-blue-500 !to-indigo-600 !rounded-full !shadow-2xl hover:scale-110 transition-transform duration-300"></div>
      </div>

      {/* Decorative background shapes */}
      <div className="absolute -top-20 -left-20 w-80 h-80  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-20 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
    </section>
  );
};

export default TestimonialsSection;
