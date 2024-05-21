import React from 'react';
import BodyLeft from '../components/BodyLeft';
import BodyRight from '../components/BodyRight';
import Head from '../components/Head';
const bg = '/assets/images/bg.png';

const AdPage = () => {
  return (
    <>
      <Head pageTitle="Join Our Premium Groups" />
      <div className=" bg-[url('/assets/images/bg.png')]">
        <div className="bg-[#0000009d] h-[100%] w-[100%] ">
          <div className="h-[100%] m:max-w-[90%] md:max-w-[85%] lg:max-w-[85%] xl:max-w-[65%] 2xl:max-w-[65%] m-auto pb-[50px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
            <BodyLeft />
            <BodyRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdPage;
