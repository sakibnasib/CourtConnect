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

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Banner() {
  return (
    <div className="relative w-full max-w-screen-xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={6000}
        transitionTime={800}
        swipeable
        emulateTouch
        showArrows={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30
                           bg-black/30 hover:bg-black/50 text-white p-4 md:p-6
                           rounded-full transition-colors duration-300 transform scale-95 hover:scale-100"
            >
              <FaAngleLeft size={24} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30
                           bg-black/30 hover:bg-black/50 text-white p-4 md:p-6
                           rounded-full transition-colors duration-300 transform scale-95 hover:scale-100"
            >
              <FaAngleRight size={24} />
            </button>
          )
        }
      >
        {/* Slide 1 */}
        <div className="relative w-full h-[80vh]">
          <img
            src="https://i.ibb.co/JwyVg7L4/images-1.jpg"
            alt="Tennis court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-start text-left text-white p-8 md:p-12 
            bg-gradient-to-t from-black/60 to-transparent">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
                Book Your Favorite Courts
              </h2>
              <p className="text-base md:text-xl font-light mb-8 drop-shadow">
                Tennis, squash, and badminton — reserve slots with ease.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full shadow-lg transition-all duration-300 animate-zoomIn">
                Explore Courts
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative w-full h-[80vh]">
          <img
            src="https://i.ibb.co/4mtZfWm/court-2.jpg"
            alt="Squash court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end items-start text-left text-white p-8 md:p-12 
            bg-gradient-to-t from-black/60 to-transparent">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-3 drop-shadow-md">
                Play Anytime, Anywhere
              </h2>
              <p className="text-base md:text-xl font-light mb-8 drop-shadow">
                Easy booking, instant confirmation, no hassle.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 md:px-10 md:py-4 rounded-full shadow-lg transition-all duration-300 animate-zoomIn">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}