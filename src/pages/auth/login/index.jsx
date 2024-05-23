import React from 'react';
import Head from '../../../components/Head';
import LoginBody from '../../../components/auth/LoginBody';
import checkLogin from '../../../api/checkLogin';

const LoginPage = () => {
  checkLogin();

  return (
    <>
      <Head pageTitle="Login to your account" />
      <div className="h-screen md:overflow-y-hidden pt-[30px] md:pt-0 pb-[60px] md:pb-[60px]">
        <div className=" mt-[10%] max-w-[650px] mx-auto px-5 py-8 md:py-0 ">
          <LoginBody />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
