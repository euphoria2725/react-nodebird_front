import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import Head from "next/head";
import "antd/dist/antd.css";

import wrapper from "../store/configureStore";

const App = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component />
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  store: PropTypes.object,
};

export default App;
