import React from 'react';
import { Link } from 'react-router-dom';

const BodyLeft = () => {
  return (
    <div className="col-span-1 ">
      <div className="left-box w-[90%] bg-[#00000081] py-10 text-center px-8 md:px-5">
        <div className="flex items-center justify-center gap-3 text-white mb-8">
          <img src="/assets/images/telegram.svg" alt="Hedge Funds" className="h-[30px]" />
          <div className="text-sm md:text-[16px] uppercase">
            Premium groups for our premium users
          </div>
          <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[30px]" />
        </div>
        <h1 className="text-[20px] md:text-[35px] w-[95%] md:w-[90%] m-auto text-white uppercase title">
          Click the button below
        </h1>
        <div className="text-[13px] md:text-[17px] my-5 md:my-10 ">
          and receive your immediate access to my premium Telegram and WhatsApp groups
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2 justify-between px-8 md:px-0">
          <Link
            to="#"
            className="col-span-1 py-[10px] md:py-[15px] border border-dotted uppercase text-[13px] text-white flex gap-2 items-center justify-center"
          >
            Join WhatsApp
            <img src="/assets/images/whatsapp.png" alt="Hedge Funds" className="h-[20px]" />
          </Link>
          <Link
            to="#"
            className="col-span-1 py-[10px] md:py-[15px] border border-dotted uppercase text-[13px] text-white flex gap-2 items-center justify-center"
          >
            Join Telegram
            <img src="/assets/images/telegram.svg" alt="Hedge Funds" className="h-[20px]" />
          </Link>
        </div>

        <div className="w-[100%] py-3 info mt-[50px] bg-[#000000ab]">
          <div className="text-[15px] text-white font-bold mb-1">
            Don't have Telegram on your smartphone?
          </div>
          <div className="text-[15px]">Click the button below and download</div>
        </div>

        <div className="flex mt-10 mb-7 justify-between w-[100%] md:px-6">
          <Link
            to="https://apps.apple.com/br/app/telegram-messenger/id686449807"
            className="w-[47%]"
          >
            <img src="/assets/images/app-store.png" alt="Hedge Funds" className="w-[100%]" />
          </Link>
          <Link
            to="https://play.google.com/store/apps/details?id=org.telegram.messenger&hl=pt_BR&gl=US&pli=1"
            className="w-[47%]"
          >
            <img src="/assets/images/google-play.png" alt="Hedge Funds" className="w-[100%]" />
          </Link>
        </div>

        <Link to="" className="font-bold text-blue-400 text-[17px]">
          Back to our website
        </Link>
      </div>
    </div>
  );
};

export default BodyLeft;
