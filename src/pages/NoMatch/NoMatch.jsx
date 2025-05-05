import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PageNotFound = () => (
  <Box sx={{ mt: 5 }}>
    <Typography align="center" variant="h2" component="div" gutterBottom>
      Not Found
    </Typography>
    <Typography
      sx={{ color: "rgb(147,148,151)" }}
      align="center"
      variant="h5"
      gutterBottom
      component="div"
    >
      Seems like the page you are looking for does not exist.
    </Typography>
  </Box>
);

export default PageNotFound;
