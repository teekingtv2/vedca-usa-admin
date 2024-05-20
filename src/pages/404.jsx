import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-[100%] bg-[#030811] py-[60px] md:py-[100px] px-7 w-[100vw] text-center">
      <p>
        The page you are trying to visit does not exist on this app. Looks like you got here by a
        mistake.
      </p>

      <Link
        to="/"
        style={{
          fontWeight: '700',
        }}
      >
        Go back to the homepage
      </Link>
    </div>
  );
};

export default NotFound;
