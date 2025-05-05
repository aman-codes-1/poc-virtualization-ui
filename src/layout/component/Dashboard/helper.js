import BackupTableIcon from "@mui/icons-material/BackupTable";
import Dns from "@mui/icons-material/Dns";

export const serverData = [
  { icon: <BackupTableIcon />, label: "Table", route: "/server_side/table" },
  { icon: <Dns />, label: "DropDown", route: "/server_side/dropdown" },
];

export const clientData = [
  { icon: <BackupTableIcon />, label: "Table", route: "/client_side/table" },
  { icon: <Dns />, label: "DropDown", route: "/client_side/dropdown" },
];
