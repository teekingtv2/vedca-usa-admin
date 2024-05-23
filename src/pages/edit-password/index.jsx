import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import EditPasswordBody from '../../components/EditPasswordBody';

const EditPasswordPage = () => {
  return (
    <>
      <Head pageTitle="Transactions" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-10 md:py-[20px]">
        <EditPasswordBody />
      </div>
    </>
  );
};

export default EditPasswordPage;
