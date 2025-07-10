import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  return (
    <section className="max-w-7xl mx-auto  ">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        {/* Slide 1 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/bj0PtCH3/basketball-court-with-wire-fence-around.jpg"
            alt="Club"
            className="object-cover w-full h-[70vh] rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-start px-10">
            <div className="text-white space-y-4 max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-bold">Welcome to CourtConnect</h2>
              <p className="text-lg">The ultimate sports club in Dhaka for fitness and fun.</p>
              {/* <a href="/courts" className="btn btn-primary mt-2">Explore Courts</a> */}
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/kYX7qWt/basketball-court.jpg"
            alt="Courts"
            className="object-cover w-full h-[70vh] rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-start px-10">
            <div className="text-white space-y-4 max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-bold">Book Your Favorite Courts</h2>
              <p className="text-lg">Tennis, squash, badminton – reserve slots easily.</p>
              {/* <a href="/login" className="btn btn-secondary mt-2">Join Now</a> */}
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img
            src="https://i.ibb.co/rK6GCWY7/basketball-court-1.jpg"
            alt="Activities"
            className="object-cover w-full h-[70vh] rounded-xl"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-start px-10">
            <div className="text-white space-y-4 max-w-xl">
              <h2 className="text-4xl lg:text-6xl font-bold">Join Club Activities & Events</h2>
              <p className="text-lg">Train, compete, and connect with fellow members.</p>
              {/* <a href="/dashboard" className="btn btn-accent mt-2">Go to Dashboard</a> */}
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default Banner;
