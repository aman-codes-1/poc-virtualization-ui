/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { noData } from "../config/constants";

const withLoaderAndMessage = (Component) => {
  const Enhanced = (props) => {
    const { loading, dataLength, ...rest } = props;
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      );
    }
    if (dataLength < 1) {
      return (
        <Typography sx={{ display: "flex", justifyContent: "center" }}>
          {noData}
        </Typography>
      );
    }
    return <Component {...rest} />;
  };
  Enhanced.defaultProps = {
    loading: false,
  };
  Enhanced.propTypes = {
    loading: PropTypes.bool,
    dataLength: PropTypes.number.isRequired,
  };
  return Enhanced;
};

export default withLoaderAndMessage;
