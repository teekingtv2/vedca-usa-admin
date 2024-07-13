import React from 'react';
import { Helmet } from 'react-helmet';

const Head = ({ pageTitle }) => {
  return (
    <Helmet>
      <title>VADCA USA - {pageTitle}</title>
      <meta
        name="description"
        content={`Welcome to the Vengo Development & Cultural Association USA (VEDCAUSA), USA chapter - an NGO organisation representing the good Nigerians outside of our dear motherland.`}
      />
      <meta
        name="author"
        content="Mudashir Tunde (Tee King) - Jaflah Software Development Company LTD (jaflah.com.ng)"
      />
      <link rel="shortcut icon" href="/assets/images/logo.png" type="image/x-icon" />
      <meta name="theme-color" content="#040204" />
      <meta name="msapplication-navbutton-color" content="#040204"></meta>
      <meta content="#040204" name="msapplication-navbutton-color" />
      <meta content="yes" name="apple-mobile-web-app-capable" />
      <meta content="black-translucent" name="apple-mobile-web-app-status-bar-style" />
    </Helmet>
  );
};

export default Head;
