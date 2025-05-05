import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import "./viewDialog.css";

const ViewDialog = (props) => {
  const { onClose, open, data } = props;
  return (
    <>
      {data && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="70px"
          marginRight="10px"
          marginleft="10px"
        >
          <div style={{ backgroundColor: "white" }}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
              <div className="left">
                <div className="data">Name:</div>
                <div>{data.name}</div>
              </div>
              <div className="left">
                <div className="data">Role:</div>
                <div> {data.role}</div>
              </div>
              <div className="left">
                <div className="data">Email:</div>
                <div> {data.email}</div>
              </div>
              <div className="left">
                <div className="data">Phone:</div>
                <div> {data.phone}</div>
              </div>
              <div className="left">
                <div className="data">City:</div>
                <div> {data.city}</div>
              </div>
              <div className="left">
                <div className="data">Location:</div>
                <div> {data.geolocation}</div>
              </div>
              <div className="left">
                <div className="data">Website:</div>
                <div> {data.website}</div>
              </div>
              <div className="left">
                <div className="data">Company:</div>
                <div> {data.company}</div>
              </div>
              <DialogContentText
                className="subHeading"
                sx={{ fontSize: "14px" }}
              >
                Business History
              </DialogContentText>
              <div className="left">
                <div className="data">Name:</div>{" "}
                <div>{data.fullDetails[0].businessHistory.name}</div>
              </div>
              <div className="left">
                <div className="data">Date:</div>{" "}
                <div>{data.fullDetails[0].businessHistory.date}</div>
              </div>
              <div className="left">
                <div className="data">Amount:</div>{" "}
                <div>{data.fullDetails[0].businessHistory.amount}</div>
              </div>
              <DialogContentText
                className="subHeading"
                sx={{ fontSize: "14px" }}
              >
                Account History
              </DialogContentText>
              <div className="left">
                <div className="data">Name:</div>{" "}
                <div>{data.fullDetails[0].accountHistory.name}</div>
              </div>
              <div className="left">
                <div className="data">Number:</div>{" "}
                <div>{data.fullDetails[0].accountHistory.number}</div>
              </div>
              <div className="left">
                <div className="data">Type:</div>{" "}
                <div>{data.fullDetails[0].accountHistory.type}</div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Close</Button>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </>
  );
};
ViewDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ViewDialog;
