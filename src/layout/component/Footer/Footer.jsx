import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Footer = () => (
  <Grid container style={{ position: "fixed", bottom: 10, width: "70%" }}>
    <Grid item container direction="column" justify="flex-start">
      <Typography
        sx={{ pt: "30px" }}
        variant="body2"
        color="text.secondary"
        align="center"
      >
        {"Copyright © Successive Technologies "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
