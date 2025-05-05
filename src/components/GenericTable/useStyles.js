import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";

export const useStyles = makeStyles((theme) => ({
  tableCells: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.primary.contrastText,
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "#f5f5f5",
    },
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#dfdfdf",
    },
  },
  tableHead: {
    backgroundColor: "white",
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      cursor: "pointer",
    },
  },
  defaultHead: {
    color: "gray",
  },
  root: {
    width: "100%",
    overflowX: "auto",
    backgroundColor: theme.palette.primary.contrastText,
  },
  table: {
    minWidth: 700,
  },
  headRow: {
    backgroundColor: theme.palette.background.popover,
  },
  headCell: {
    fontFamily: "NunitoSans-Bold",
    lineHeight: "normal",
  },
  colorLabel: {
    padding: theme.spacing(0.2, 1),
    whiteSpace: "noWrap",
    borderRadius: "0.8em",
    color: theme.palette.primary.contrastText,
  },
  center: {
    textAlign: "center",
  },
  noBorder: {
    border: 0,
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));
