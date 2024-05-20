import React from 'react';
import { Link } from 'react-router-dom';

const BodyLeft = () => {
  return (
    <div className="col-span-1 ">
      <div className="w-[80%] bg-[#00000081] py-10 text-center px-4">
        <div className="flex items-center justify-center gap-3 text-white mb-8">
          <div className="text-sm uppercase">Premium group for premium users</div>
          <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[35px]" />
        </div>
        <h1 className="text-[20px] w-[100%] m-auto text-white uppercase title">
          Click the button below
        </h1>
        <div className="text-[13px] mt-10 mb-5 ">
          and receive your immediate access to my premium Telegram and WhatsApp groups
        </div>
        <div className="flex justify-between">
          <Link
            to="#"
            className="enter-btn uppercase text-[10px] text-white flex gap-2 items-center"
          >
            Enter WhatsApp
            <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[20px]" />
          </Link>
          <Link
            to="#"
            className="enter-btn uppercase text-[12px] text-white flex gap-2 items-center"
          >
            Enter Telegram
            <img src="/assets/images/telegram.svg" alt="Hedge Funds" className="h-[20px]" />
          </Link>
        </div>

        <div className="w-[100%] py-3 info mt-[30px] bg-[#000000ab]">
          <div className="text-[12px] text-white font-bold">
            Don't have Telegram on your smartphone?
          </div>
          <div className="text-[10px]">Click the button below and download</div>
        </div>

        <div className="flex mt-5 justify-between">
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
