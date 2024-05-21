import React from 'react';
import { Link } from 'react-router-dom';
import Head from '../components/Head';
import NavBar from '../components/NavBar';
import DashboardBody from '../components/DashboardBody';

const DashboardPage = () => {
  return (
    <>
      <Head pageTitle="Welcome Home" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        <DashboardBody />
      </div>
    </>
  );
};

export default DashboardPage;
