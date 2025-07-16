import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    img: "https://i.ibb.co/bj0PtCH3/basketball-court-with-wire-fence-around.jpg",
    heading: "Welcome to CourtConnect",
    subtext: "The ultimate sports club in Dhaka for fitness and fun.",
  },
  {
    img: "https://i.ibb.co/kYX7qWt/basketball-court.jpg",
    heading: "Book Your Favorite Courts",
    subtext: "Tennis, squash, badminton – reserve slots easily.",
  },
  {
    img: "https://i.ibb.co/rK6GCWY7/basketball-court-1.jpg",
    heading: "Join Club Activities & Events",
    subtext: "Train, compete, and connect with fellow members.",
  },
];

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto ">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={5000}
        transitionTime={700}
        swipeable
        emulateTouch
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
            >
              <FaArrowLeft size={20} />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-3 rounded-full"
            >
              <FaArrowRight size={20} />
            </button>
          )
        }
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative rounded-xl overflow-hidden">
            <img
              src={slide.img}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-[70vh]"
            />
            <div className="absolute inset-0" />
            <div className="absolute inset-0 z-20 flex items-center px-6 lg:px-16">
              <motion.div
                className="text-blue-200 max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2
                  className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-xl"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2 }}
                >
                  {slide.heading}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl text-white/90"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.4 }}
                >
                  {slide.subtext}
                </motion.p>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;
