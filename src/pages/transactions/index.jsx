import React from 'react';
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import TransactionsBody from '../../components/TransactionsBody';

const TransactionsPage = () => {
  return (
    <>
      <Head pageTitle="Transactions" />
      <NavBar />
      <div className="h-[100%] max-w-[940px] mx-auto px-5 py-8 md:py-[50px]">
        <TransactionsBody />
      </div>
    </>
  );
};

export default TransactionsPage;
