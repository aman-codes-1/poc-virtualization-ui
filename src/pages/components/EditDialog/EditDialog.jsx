import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import FormControl from "@mui/material/FormControl";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import WebIcon from "@mui/icons-material/Web";
import BusinessIcon from "@mui/icons-material/Business";
import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./editDialog.css";

const EditDialog = (props) => {
  const { open, value, onChange, onClose, onSubmit, loading } = props;
  return (
    <>
      {value && (
        <Dialog
          open={open}
          onClose={onClose}
          marginRight="10px"
          marginleft="10px"
        >
          <div style={{ backgroundColor: "white" }}>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter your User details</DialogContentText>
              <div className="fields">
                <div className="rows">
                  <FormControl sx={{ m: 1 }} value={value.name} required>
                    <InputLabel htmlFor="outlined-adornment-name">
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name"
                      type="text"
                      name="name"
                      defaultValue={value.name}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Name"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} value={value.name} required>
                    <InputLabel htmlFor="role">Role</InputLabel>
                    <OutlinedInput
                      id="role"
                      type="text"
                      name="role"
                      defaultValue={value.role}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <PersonIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Role"
                    />
                  </FormControl>
                </div>
                <div className="rows">
                  <FormControl sx={{ m: 1 }} value={value.email}>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      name="email"
                      defaultValue={value.email}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Email Address"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} value={value.phone}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <OutlinedInput
                      id="phone"
                      type="text"
                      name="phone"
                      defaultValue={value.phone}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <PhoneIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Phone"
                    />
                  </FormControl>
                </div>
                <div className="rows">
                  <FormControl sx={{ m: 1 }} value={value.city}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <OutlinedInput
                      id="city"
                      type="text"
                      name="city"
                      defaultValue={value.city}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <LanguageIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="City"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} value={value.location}>
                    <InputLabel htmlFor="location">Location</InputLabel>
                    <OutlinedInput
                      id="location"
                      type="text"
                      name="location"
                      defaultValue={value.geolocation}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <LocationOnIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Location"
                    />
                  </FormControl>
                </div>
                <div className="rows">
                  <FormControl sx={{ m: 1 }} value={value.name} required>
                    <InputLabel htmlFor="website">Website</InputLabel>
                    <OutlinedInput
                      id="website"
                      type="text"
                      name="website"
                      defaultValue={value.website}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <WebIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Website"
                    />
                  </FormControl>
                  <FormControl sx={{ m: 1 }} value={value.name} required>
                    <InputLabel htmlFor="company">Company</InputLabel>
                    <OutlinedInput
                      id="company"
                      type="text"
                      name="company"
                      defaultValue={value.company}
                      onChange={onChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <BusinessIcon fontSize="small" color="black" />
                        </InputAdornment>
                      }
                      label="Company"
                    />
                  </FormControl>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <LoadingButton
                loading={loading}
                onClick={onSubmit}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </div>
        </Dialog>
      )}
    </>
  );
};

EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default EditDialog;
