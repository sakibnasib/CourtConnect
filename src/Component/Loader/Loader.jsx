import React from 'react';
import { TbFidgetSpinner } from 'react-icons/tb';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white">
     <TbFidgetSpinner className="text-4xl animate-spin text-blue-700" />
    </div>
    );
};

export default Loader;