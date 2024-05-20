import React from 'react';
import { Link } from 'react-router-dom';

const BodyLeft = () => {
  return (
    <div className="col-span-1 ">
      <div className="w-[90%] bg-[#00000081] py-10 text-center px-8">
        <div className="flex items-center justify-center gap-3 text-white mb-8">
          <div className="text-sm md:text-[16px] uppercase">Premium group for premium users</div>
          <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[35px]" />
        </div>
        <h1 className="text-[20px] md:text-[35px] w-[95%] md:w-[90%] m-auto text-white uppercase title">
          Click the button below
        </h1>
        <div className="text-[13px] md:text-[17px] my-5 md:my-10 ">
          and receive your immediate access to my premium Telegram and WhatsApp groups
        </div>
        <div className="flex justify-between">
          <Link
            to="#"
            className="enter-btn uppercase text-[13px] text-white flex gap-2 items-center"
          >
            Enter WhatsApp
            <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[20px]" />
          </Link>
          <Link
            to="#"
            className="enter-btn uppercase text-[13px] text-white flex gap-2 items-center"
          >
            Enter Telegram
            <img src="/assets/images/telegram.svg" alt="Hedge Funds" className="h-[20px]" />
          </Link>
        </div>

        <div className="w-[100%] py-3 info mt-[50px] bg-[#000000ab]">
          <div className="text-[15px] text-white font-bold mb-1">
            Don't have Telegram on your smartphone?
          </div>
          <div className="text-[15px]">Click the button below and download</div>
        </div>

        <div className="flex mt-10 justify-between">
          <Link
            to="https://apps.apple.com/br/app/telegram-messenger/id686449807"
            className="w-[48%]"
          >
            <img src="/public/assets/images/app-store.png" alt="Hedge Funds" className="w-[100%]" />
          </Link>
          <Link
            to="https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=pt_BR&gl=US&pli=1"
            className="w-[48%]"
          >
            <img
              src="/public/assets/images/google-play.png"
              alt="Hedge Funds"
              className="w-[100%]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BodyLeft;
