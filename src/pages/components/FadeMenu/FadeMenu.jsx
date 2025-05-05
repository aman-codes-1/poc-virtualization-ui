import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { ViewDialog, EditDialog, RemoveDialog } from "../index";
import { SnackbarContext } from "../../../contexts/SnackbarProvider/SnackbarProvider";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_USER_DETAIL } from "../query";
import { DELETE_USER, UPDATE_USER } from "../mutation";
import { db } from "../../../lib/indexedDb";

const FadeMenu = (props) => {
  const { userId, refetchQuery } = props;

  const actionsInitialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    city: "",
    location: "",
    website: "",
    company: "",
    role: "",
  };
  const [userDetails, setUserDetails] = useState();
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const handleOpen = useContext(SnackbarContext);
  const [actions, setActions] = useState(actionsInitialState);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [getUser] = useLazyQuery(GET_USER_DETAIL, {
    variables: { id: actions.id },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const {
        getUser: { data: DATA },
      } = data;
      setUserDetails(DATA);
    },
  });
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  // IndexedDB

  const fetchIndexedData = async (cursor, operation) => {
    try {
      const indexedData = await db.users.get(cursor);
      setUserDetails(indexedData);
      refetchQuery.handler((prev) => ({ status: !prev.status, operation }));
      return indexedData;
    } catch (error) {
      handleOpen(error.message, "error");
    }
  };

  const updateIndexedData = async (cursor, newDetails) => {
    try {
      await db.users.update(cursor, newDetails);
      // duplicate of line-42 to be removed once backend edit functionality starts working
      setUserDetails(actions);
      refetchQuery.handler((prev) => ({
        status: !prev.status,
        operation: "update",
      }));
    } catch (error) {
      handleOpen(error.message, "error");
    }
  };

  const deleteIndexedData = async (cursor) => {
    try {
      await db.users.where("originalId").equals(cursor).delete();
      // duplicate of line-42 to be removed once backend edit functionality starts working
      refetchQuery.handler((prev) => ({
        status: !prev.status,
        operation: "delete",
      }));
    } catch (error) {
      handleOpen(error.message, "error");
    }
  };

  // FadeMenu Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setActions({
      ...actions,
      id: userId,
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
    setActions(actionsInitialState);
  };

  // View Dialog Handlers
  const handleViewDialogOpen = async () => {
    try {
      setOpenViewDialog(true);
      if (refetchQuery.name === "client") {
        await fetchIndexedData(userId, "view");
        return;
      }
      await getUser();
    } catch (e) {
      handleOpen(e.message, "error");
      setOpenViewDialog(false);
    }
  };

  const handleViewDialogClose = () => {
    setOpenViewDialog(false);
  };

  // Edit Button handlers
  const handleEditDialogOpen = async () => {
    setOpenEditDialog(true);
    if (refetchQuery.name === "client") {
      const indexDbData = await fetchIndexedData(userId, "update");
      setActions({
        ...actions,
        ...indexDbData,
        location: indexDbData.geolocation,
      });
    } else {
      const {
        data: {
          getUser: { data: user },
        },
      } = await getUser();
      setActions({
        ...actions,
        ...user,
        location: user.geolocation,
      });
    }
  };

  const handleEditChange = (event) => {
    const { value, name: type } = event.target;
    setActions({ ...actions, [type]: value });
  };

  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      // Backend Code
      await updateUser({
        variables: {
          originalId: actions.id,
          name: actions.name,
          email: actions.email,
          phone: actions.phone,
          city: actions.city,
          geolocation: actions.location,
          website: actions.website,
          company: actions.company,
          role: actions.role,
        },
      });

      await updateIndexedData(userId, {
        name: actions.name,
        email: actions.email,
        phone: actions.phone,
        city: actions.city,
        geolocation: actions.location,
        website: actions.website,
        company: actions.company,
        role: actions.role,
      });
      if (refetchQuery.name === "server") {
        await refetchQuery.handler();
      }
      setLoading(false);
      setOpenEditDialog(false);
      handleOpen("User Updated Successfully!", "success");
    } catch (e) {
      handleOpen(e.message, "error");
      setOpenEditDialog(false);
    }
  };
  const handleEditClose = () => {
    setOpenEditDialog(false);
  };

  // Delete Button handlers
  const handleRemoveDialogOpen = () => {
    setOpenRemoveDialog(true);
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser({ variables: { id: actions.id } });
      await deleteIndexedData(userId);
      if (refetchQuery.name === "server") {
        await refetchQuery.handler();
      }
      setLoading(false);
      setOpenRemoveDialog(false);
      handleOpen("User Deleted!", "success");
    } catch (e) {
      handleOpen(e.message, "error");
      setOpenRemoveDialog(false);
    }
  };
  const handleRemoveDialogClose = () => {
    setOpenRemoveDialog(false);
  };

  return (
    <>
      <IconButton>
        <MoreHorizIcon
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div
          style={{
            backgroundColor: "white",
            paddingTop: "10px",
            paddingBottom: "10px",
            marginTop: "-8px",
            marginBottom: "-8px",
          }}
        >
          <MenuItem onClick={handleViewDialogOpen}>View Details</MenuItem>
          <MenuItem onClick={handleEditDialogOpen}>Edit</MenuItem>
          <MenuItem onClick={handleRemoveDialogOpen}>Delete</MenuItem>
        </div>
      </Menu>
      <ViewDialog
        open={openViewDialog}
        data={userDetails}
        onClose={handleViewDialogClose}
      />
      <EditDialog
        open={openEditDialog}
        loading={loading}
        value={userDetails}
        onChange={handleEditChange}
        onClose={handleEditClose}
        onSubmit={handleEditSubmit}
      />
      <RemoveDialog
        loading={loading}
        open={openRemoveDialog}
        onDelete={handleDelete}
        onClose={handleRemoveDialogClose}
      />
    </>
  );
};

export default FadeMenu;
