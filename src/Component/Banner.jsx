// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { motion } from "framer-motion";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

// const slides = [
//   {
//     img: "https://i.ibb.co/bj0PtCH3/basketball-court-with-wire-fence-around.jpg",
//     heading: "Welcome to CourtConnect",
//     subtext: "The ultimate sports club in Dhaka for fitness and fun.",
//   },
//   {
//     img: "https://i.ibb.co/kYX7qWt/basketball-court.jpg",
//     heading: "Book Your Favorite Courts",
//     subtext: "Tennis, squash, badminton – reserve slots easily.",
//   },
//   {
//     img: "https://i.ibb.co/rK6GCWY7/basketball-court-1.jpg",
//     heading: "Join Club Activities & Events",
//     subtext: "Train, compete, and connect with fellow members.",
//   },
// ];

// const Banner = () => {
//   return (
//     <section className="w-12/12 mx-auto ">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         interval={5000}
//         transitionTime={700}
//         swipeable
//         emulateTouch
//         renderArrowPrev={(onClickHandler, hasPrev, label) =>
//           hasPrev && (
//             <button
//               type="button"
//               onClick={onClickHandler}
//               title={label}
//               className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
//             >
//               <FaAngleLeft size={20} />
//             </button>
//           )
//         }
//         renderArrowNext={(onClickHandler, hasNext, label) =>
//           hasNext && (
//             <button
//               type="button"
//               onClick={onClickHandler}
//               title={label}
//               className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
//             >
//               <FaAngleRight size={20} />
//             </button>
//           )
//         }
//       >
//         {slides.map((slide, index) => (
//           <div key={index} className="relative rounded-xl overflow-hidden">
//             <img
//               src={slide.img}
//               alt={`Slide ${index + 1}`}
//               className="object-cover w-full h-[70vh]"
//             />
//             <div className="absolute inset-0" />
//             <div className="absolute inset-0 z-20 flex items-center px-6 lg:px-16">
//               <motion.div
//                 className="text-white max-w-2xl"
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//               >
//                 <motion.h2
//                   className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-xl"
//                   initial={{ opacity: 0, x: -40 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 1.2 }}
//                 >
//                   {slide.heading}
//                 </motion.h2>
//                 <motion.p
//                   className="text-lg md:text-xl text-white"
//                   initial={{ opacity: 0, x: 40 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 1.4 }}
//                 >
//                   {slide.subtext}
//                 </motion.p>
//               </motion.div>
//             </div>
//           </div>
//         ))}
//       </Carousel>
//     </section>
//   );
// };

// export default Banner;

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co/bj0PtCH3/basketball-court-with-wire-fence-around.jpg",
    title: "Welcome to CourtConnect",
    description: "The ultimate sports club in Dhaka for fitness and fun.",
   
  },
  {
    id: 2,
    image: "https://i.ibb.co/kYX7qWt/basketball-court.jpg",
    title: "Book Your Favorite Courts",
    description: "Tennis, squash, badminton – reserve slots easily.",
   
  },
  {
    id: 3,
    image: "https://i.ibb.co/rK6GCWY7/basketball-court-1.jpg",
    title: "Join Club Activities & Events",
    description: "Train, compete, and connect with fellow members",
   
  },
];

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ 
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        loop
        className="hero-swiper"
        speed={800}
        effect="fade"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[400px] md:h-[500px] lg:h-[500px]  overflow-hidden mx-4  shadow-2xl">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-fit transition-transform duration-700 hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-8 md:px-12 lg:px-16">
          
                
                {/* Title */}
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight drop-shadow-2xl">
                  {slide.title}
                </h2>
                
                {/* Description */}
                <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl text-gray-200 leading-relaxed drop-shadow-lg">
                  {slide.description}
                </p>
                
                {/* Call to Action Button */}
                {/* <button className="group relative inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-full text-lg transition-all duration-300 hover:bg-gray-100 hover:scale-105 hover:shadow-2xl transform">
                 
                  <svg 
                    className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button> */}
              </div>
              
              {/* Decorative Elements */}
              
            </div>
          </SwiperSlide>
        ))}
        
        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
      
      {/* Inline Styles */}
      <style jsx>{`
        .hero-swiper {
          position: relative;
        }

        .hero-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
          margin: 0 4px;
        }

        .hero-swiper .swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .hero-swiper .swiper-pagination {
          bottom: 20px;
          z-index: 10;
        }

        .hero-swiper .swiper-button-prev,
        .hero-swiper .swiper-button-next {
          color: white !important;
          background: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(10px) !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          transition: all 0.3s ease !important;
          z-index: 10;
        }

        .hero-swiper .swiper-button-prev:hover,
        .hero-swiper .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          transform: scale(1.1);
          box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
        }

        .hero-swiper .swiper-button-prev::after,
        .hero-swiper .swiper-button-next::after {
          font-size: 18px !important;
          font-weight: bold !important;
        }

        /* Slide animations */
        .hero-swiper .swiper-slide {
          transition: transform 0.3s ease;
        }

        .hero-swiper .swiper-slide-active {
          transform: scale(1.02);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-swiper .swiper-button-prev,
          .hero-swiper .swiper-button-next {
            width: 40px !important;
            height: 40px !important;
          }
          
          .hero-swiper .swiper-button-prev::after,
          .hero-swiper .swiper-button-next::after {
            font-size: 16px !important;
          }
          
          .hero-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
          }
        }

        /* Loading animation for images */
        .hero-swiper img {
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Hover effects for interactive elements */
        .hero-swiper .swiper-slide:hover img {
          transform: scale(1.05);
        }

        /* Custom scrollbar for webkit browsers */
        .hero-swiper::-webkit-scrollbar {
          display: none;
        }

        /* Ensure proper z-index stacking */
        .hero-swiper .swiper-wrapper {
          z-index: 1;
        }

        .hero-swiper .swiper-slide {
          z-index: 2;
        }

        /* Accessibility improvements */
        .hero-swiper .swiper-button-prev:focus,
        .hero-swiper .swiper-button-next:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        .hero-swiper .swiper-pagination-bullet:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default Banner;