import React from 'react';

const DashboardBody = ({ userData }) => {
  return (
    <div className="h-[100%] w-[100%]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">${userData.deposite_balance}</div>
            <div className="text-[14px] md:text-[15px]">Deposit Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Amount Deposited</div>
          </div>
        </div>
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">${userData.profit_balance}</div>
            <div className="text-[14px] md:text-[15px]">Trading Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Total Profit Made</div>
          </div>
        </div>
        <div className="dashCard">
          <img
            src="/assets/images/dahboard/balance-1.png"
            alt="Hedge Funds"
            className="w-[25%] md:w-[30%]"
          />
          <div className="">
            <div className="dashCardTitle">${userData.total_balance}</div>
            <div className="text-[14px] md:text-[15px]">Total Balance</div>
            <div className="text-[11px] text-[#FFE6A6]">Withdrawable Balance</div>
          </div>
        </div>
      </div>

      <div className="">
        <div className="text-[20px] md:text-[25px] font-bold mb-[10px]">Recent Transactions</div>
        <div className="p-2 bg-[#151515c2] overflow-x-scroll ">
          <div className="p-2 mb-2 w-[720px] md:w-[883px]">
            <div className="font-bold text-[14.5px] md:text-[18px] uppercase grid grid-cols-9 w-[100%] p-2 mb-2">
              <div className="col-span-1">SN</div>
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Amount Invested</div>
              <div className="col-span-2">Amount Made</div>
              <div className="col-span-2">Balance Due</div>
            </div>

            <div className="text-[15] md:text-[16px] grid grid-cols-9 w-[100%] p-2 my-1 bg-[#444444]">
              <div className="col-span-1">1</div>
              <div className="col-span-2">May 10, 2024</div>
              <div className="col-span-2">$1,300.00</div>
              <div className="col-span-2">$700.00</div>
              <div className="col-span-2">$5,000.00</div>
            </div>
            <div className="text-[15] md:text-[16px] grid grid-cols-9 w-[100%] p-2 my-1 bg-[#444444]">
              <div className="col-span-1">2</div>
              <div className="col-span-2">April 25, 2024</div>
              <div className="col-span-2">$2,500.00</div>
              <div className="col-span-2">$500.00</div>
              <div className="col-span-2">$3,000.00</div>
            </div>
            <div className="text-[15] md:text-[16px] grid grid-cols-9 w-[100%] p-2 my-1 bg-[#444444]">
              <div className="col-span-1">2</div>
              <div className="col-span-2">April 25, 2024</div>
              <div className="col-span-2">$2,500.00</div>
              <div className="col-span-2">$500.00</div>
              <div className="col-span-2">$3,000.00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardBody;
