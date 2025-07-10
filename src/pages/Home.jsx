import React from 'react';
import About from '../Component/About';
import LocationSection from '../Component/LocationSection';
import PromotionsSection from '../Component/PromotionsSection';
import BannerSection from '../Component/Banner';
import Banner from '../Component/Banner';
import Featured from '../Component/Home/Featured ';
import WhyChoose from '../Component/Home/WhyChoose';

const Home = () => {
    return (
        <div>
            <Banner/>
           <About/>
           <Featured/>
           <WhyChoose/>
           <LocationSection/>
           <PromotionsSection/>
        </div>
    );
};

export default Home;