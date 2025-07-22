import React from 'react';
import Error from "../../../public/q8KqsyYBRT.json"
import { Link, useLocation } from 'react-router';
import Lottie from 'lottie-react';
const ErrorPage = () => {
    const location=useLocation()
    const message=location?.pathname
    return (
          <div>
            <div className="flex justify-center items-center">
  <Lottie style={{width: '450px'}} animationData={ Error}  loop={true}></Lottie>
            </div>
            <div className="">
                <p className="text-red-600 font-bold text-[2rem] text-center">
          {" "}
          we cannot fount this : <span>{message}</span>
        </p>
         <div className="flex justify-center items-center">
            <Link
          to="/"
          className="btn btn-wide text-center bg-blue-500 text-white w-full rounded-3xl mt-2 "
        >
          Go Back Home
        </Link>
         </div>
            </div>
            </div>
    );
};

export default ErrorPage;