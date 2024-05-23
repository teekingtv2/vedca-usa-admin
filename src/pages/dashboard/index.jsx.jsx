import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import DashboardBody from '../../components/DashboardBody';
import useFetchCredential from '../../api/useFetchCredential';
import axios from 'axios';
axios.defaults.withCredentials = true;

const DashboardPage = () => {
  const { data, loading } = useFetchCredential(`user-profile/user`);

  return (
    <>
      <Head pageTitle="Welcome Home" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        {data && <DashboardBody userData={data.data} />}
      </div>
    </>
  );
};

export default DashboardPage;
