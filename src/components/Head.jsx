import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ pageTitle }) => {
  return (
    <Helmet>
      <title>Hedge Funds - {pageTitle}</title>
      <meta
        name="description"
        content={`$Hedge Funds is a cryptocurrency investment trading platform that provides high Returns on Invesments for investors.`}
      />
      <meta
        name="keywords"
        content="Crypto investments, Cryptocurrency trading groups, trading groups, premium trading groups"
      />
      <meta
        name="author"
        content="Mudashir Tunde (Tee King) - Jaflah Software Development Company"
      />
      <link rel="shortcut icon" href="/assets/images/logo.png" type="image/x-icon" />
    </Helmet>
  );
};

export default Head;
