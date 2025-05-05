import React from "react";
import Typography from "@mui/material/Typography";

const HeadPage = () => (
  <>
    <Typography
      style={{ paddingTop: 10 }}
      align="center"
      variant="h2"
      component="div"
    >
      Problem Statement.
    </Typography>
    <Typography
      style={{ padding: "30px 80px 0px 80px" }}
      align="justify"
      variant="h6"
      component="div"
      gutterBottom
    >
      <p>
        We usually face performance issue when a lot of data comes into memory
        on frontend especially whenever we talk about dropdowns and tables.
      </p>
      <p>
        So, for this we have to come up with a solution where we have maintain 1
        lakh records in DB for dropdown and render it on UI We have to use a
        pagination approach to send the data that we need on the UI.
      </p>
      <p>
        Server based approach We have to send all data in one go to the client
        and then use indexed DB/ virtual components to handle that amount of
        data.
      </p>
      Expectation is that there should not be any lag while selection in
      dropdown and dropdown should be multi select.
    </Typography>
  </>
);

export default HeadPage;
