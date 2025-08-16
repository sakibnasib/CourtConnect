import React from 'react';
import About from '../Component/About';
import LocationSection from '../Component/LocationSection';
import PromotionsSection from '../Component/PromotionsSection';
import BannerSection from '../Component/Banner';
import Banner from '../Component/Banner';
import Featured from '../Component/Home/Featured ';
import WhyChoose from '../Component/Home/WhyChoose';
import UpcomingEvents from '../Component/Home/UpcomingEvents';
import TestimonialsSection from '../Component/Home/TestimonialsSection';

const Home = () => {
    return (
        <>
 <Banner/>
        <div className='w-11/12 mx-auto'>
           <About/>
           <Featured/>
           <WhyChoose/>
           <UpcomingEvents/>
           <LocationSection/>
           <PromotionsSection/>
           <TestimonialsSection/>
        </div>
        </>
        
    );
};

export default Home;