import React from 'react';

const ImagesFooter = () => {
  return (
    <div className="h-[100%] bg-[#02050c] py-[60px] md:py-[100px] px-7 w-[100vw]">
      <h2 className="text-center upppercase text-white my-3 sm:max-w-[90%] md:max-w-[85%] lg:max-w-[55%] xl:max-w-[40%] 2xl:max-w-[40%] m-auto">
        See the resuls from some of our channels
      </h2>
      <marquee behavior="alternate" direction="">
        <div className="mt-[40px] flex gap-5">
          <img
            src={`/assets/images/telegram-1.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-2.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-3.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-4.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-5.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-6.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-7.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
          <img
            src={`/assets/images/telegram-8.jpeg`}
            alt="Hedge Funds"
            className="h-[300px] mb-2 rounded-md"
          />
        </div>
      </marquee>
    </div>
  );
};

export default ImagesFooter;
