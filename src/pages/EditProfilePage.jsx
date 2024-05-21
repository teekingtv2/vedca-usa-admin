import React from 'react';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import EditProfileBody from '../components/EditProfileBody';

const EditProfilePage = () => {
  const userData = {
    name: 'Tunde Mudashir',
    email: 'devteeking@Gmail.com',
    phone: '+2349046832081',
    wallet: 'BtHDghghety63ghe6ydhjdjku83jhdhD',
    network: 'Bitcoin',
    country: 'Nigeria',
  };
  return (
    <>
      <Head pageTitle="Transactions" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[0px]">
        <EditProfileBody userData={userData} />
      </div>
    </>
  );
};

export default EditProfilePage;
