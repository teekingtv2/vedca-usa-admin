import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="h-[100%] bg-[#030811] py-[60px] md:py-[100px] px-7 w-[100vw] text-center">
      <div>
        <h1 className="mb-3">Welcome here</h1>
        <Link to="/add-1" className=" text-[#7e8000] underline">
          View first published ad
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
