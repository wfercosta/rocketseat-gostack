import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthLayout from '~/pages/_laytouts/auth';
import DefaultLayout from '~/pages/_laytouts/default';

export default function Wrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = false;

  console.tron.log(signed, isPrivate);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

Wrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  isPrivate: PropTypes.bool.isRequired,
};
