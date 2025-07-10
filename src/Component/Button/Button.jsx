import React from 'react';

const Button = ({text,isOutline}) => {
    
    return (
         <button className={`${isOutline ? 'outline' : 'primari'} cursor-pointer`}>{text} </button>
    );
};

export default Button;