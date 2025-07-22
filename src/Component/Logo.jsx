import React from 'react';
import icon from '../../public/stadium.png'
import { TypeAnimation } from 'react-type-animation';
const Logo = () => {
    return (
          <span className='flex items-center font-bold text-xl'><img src={icon} alt=""  className='w-12 h-12'/><TypeAnimation
      sequence={["CourtConnect", 2000, "Connect with Courts", 2000]}
        wrapper="span"
      cursor={true}
      repeat={Infinity}
      
    /> </span>
    );
};

export default Logo;