import React from 'react';
import Head from '../../../components/Head';
import RegisterBody from '../../../components/auth/RegisterBody';
import checkLogin from '../../../api/checkLogin';

const RegisterPage = () => {
  checkLogin();
  return (
    <>
      <Head pageTitle="Get onboarded" />
      <div className=" md:overflow-y-hidden pt-[30px] md:pt-0 pb-[60px] md:pb-[60px]">
        <div className=" mt-[10%] max-w-[850px] mx-auto px-5 py-8 md:py-0 ">
          <RegisterBody />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
