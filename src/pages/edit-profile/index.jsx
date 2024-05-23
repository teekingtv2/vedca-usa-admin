import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import EditProfileBody from '../../components/EditProfileBody';
import useFetchCredential from '../../api/useFetchCredential';
import axios from 'axios';
axios.defaults.withCredentials = true;

const EditProfilePage = () => {
  const { data, loading } = useFetchCredential(`user-profile/user`);
  return (
    <>
      <Head pageTitle="Transactions" />

      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[0px]">
        {data && <EditProfileBody data={data?.data} />}
      </div>
    </>
  );
};

export default EditProfilePage;
