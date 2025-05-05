import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

export const NavBarStyles = styled(List)({
  "& .MuiListItemButton-root": {
    paddingRight: 24,
  },
  "& .MuiListItemIcon-root": {
    marginRight: 0,
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
});

export const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: "grey",
    color: "white",
  },
  primaryColor: {
    color: "rgb(101,157,246)",
  },
}));

export const styles = {
  primaryTypographyIn: {
    fontSize: 20,
    fontWeight: "medium",
    letterSpacing: 0,
  },
  primaryTypography: {
    fontSize: 15,
    fontWeight: "medium",
    lineHeight: "20px",
    mb: "2px",
    ml: "35px",
  },
  primaryTypography2: {
    fontSize: 14,
    fontWeight: "medium",
  },
  primaryTypography3: {
    fontSize: 15,
    fontWeight: "medium",
    lineHeight: "20px",
    mb: "2px",
    ml: "35px",
  },
  primaryTypography4: {
    fontSize: 14,
    fontWeight: "medium",
  },
  sx: { py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" },
};
