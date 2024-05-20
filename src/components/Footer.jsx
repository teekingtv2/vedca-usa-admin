import React from 'react';

const Footer = () => {
  return (
    <div className="footer bg-[#030811] py-10 px-7 w-[100vw]">
      <div className=" text-center sm:max-w-[90%] md:max-w-[85%] lg:max-w-[85%] xl:max-w-[65%] 2xl:max-w-[65%] m-auto">
        <div className="text-[11px] text-gray-600 my-3">
          © 2024 Hedge Funds. All rights reserved
          <br />
          ATTENTION: We dont sell any products through the website.
        </div>
        <div className="text-[11px] text-gray-600 my-3">
          PLEASE NOTE: This site is not affiliated with Facebook or any Facebook entity. Once you
          leave Facebook, it&#8217;s not their responsibility, it&#8217;s our website&#8217;s. We
          make every effort to clearly state and show all product proofs and use actual results. We
          do not sell your email address or any information to third parties. We never do any kind
          of spam. If you have any questions, please feel free to use the contact our support in
          telegram during business hours Monday through Friday from 9:00 am to 6:00 pm. We read and
          respond to all messages on a first-come, first-served basis.
        </div>
      </div>
    </div>
  );
};

export default Footer;
