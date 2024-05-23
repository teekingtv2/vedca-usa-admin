import React from 'react';
import Head from '../../../components/Head';
import ResetPasswordBody from '../../../components/auth/ResetPasswordBody';
import checkLogin from '../../../api/checkLogin';

const ResetPasswordPage = () => {
  checkLogin();
  return (
    <>
      <Head pageTitle="Reset Password" />
      <div className="h-screen md:overflow-y-hidden pt-[30px] md:pt-0 pb-[60px] md:pb-[60px]">
        <div className=" mt-[10%] max-w-[650px] mx-auto px-5 py-8 md:py-0 ">
          <ResetPasswordBody />
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
