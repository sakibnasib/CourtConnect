import React from 'react';
import icon from '../../public/stadium.png'
const Logo = () => {
    return (
          <span className='flex items-center font-bold text-2xl'><img src={icon} alt=""  className='w-12 h-12'/> CourtConnect</span>
    );
};

export default Logo;