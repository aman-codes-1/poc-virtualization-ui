import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Footer } from "../layout/component";

const PublicRoute = (props) => {
  const { exact, path, component: Component } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        <>
          <Component />
          <Footer />
        </>
      )}
    />
  );
};

PublicRoute.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
