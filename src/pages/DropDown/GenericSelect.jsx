import * as React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useQuery } from "@apollo/client";
import { FETCH_USER_FOR_DROPDOWN } from "./query";
import MenuList from "./MenuList";
import "./style.css";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "../../components/CircularProgress";
import { generateItems } from "../../lib/helper";

const GenericSelect = () => {
  const [selected, setSelected] = React.useState([]);
  const [fetchLimit] = React.useState(100);
  const [dropdownClicked, setDropdownClicked] = React.useState(false);

  const { data, loading, error, fetchMore } = useQuery(
    FETCH_USER_FOR_DROPDOWN,
    {
      variables: {
        cursor: "",
        limit: fetchLimit,
      },
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-only",
    }
  );

  const [isItemActive, setIsItemActive] = React.useState([]);

  const toggleItemActive = (index) =>
    setIsItemActive((prevState) => {
      const item = prevState[index];
      const items = [...prevState];
      items[index] = {
        isActive: !item.isActive,
      };
      return items;
    });

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setDropdownClicked(!dropdownClicked);
  };

  const handleDelete = (uid, index) => {
    toggleItemActive(index);
    const newData = selected.filter((item) => item.id !== uid);
    setSelected(newData);
  };

  const handleClearAll = (uid, index) => {
    selected.forEach((item) => {
      toggleItemActive(item.index);
    });
    setSelected([]);
  };

  const handleAddToChips = (e, index) => {
    const user = data.getAllUsers.node[index];
    if (selected.map((item) => item.id).includes(user.originalId)) {
      handleDelete(user.originalId, index);
      return;
    }
    toggleItemActive(index);
    setSelected((prev) => [
      ...prev,
      { id: user.originalId, name: user.name, index },
    ]);
  };

  const handleScroll = async (e, itemSize, height) => {
    const nextCursor = data.getAllUsers.cursor;
    const { scrollOffset } = e;
    if (scrollOffset === itemSize * data.getAllUsers.node.length - height) {
      setIsItemActive((prev) => {
        const newItems = [...prev, ...generateItems(fetchLimit)];
        return newItems;
      });
      await fetchMore({
        variables: {
          cursor: nextCursor,
          limit: fetchLimit,
        },
        updateQuery: (prevData, { fetchMoreResult }) => {
          if (!fetchMoreResult.getAllUsers) return prevData;
          const { getAllUsers } = prevData;
          const {
            getAllUsers: { node, cursor, pageInfo },
          } = fetchMoreResult;
          const updatedNode = [...getAllUsers.node, ...node];
          return {
            getAllUsers: {
              cursor,
              node: [...updatedNode],
              pageInfo,
              __typename: getAllUsers.__typename,
            },
          };
        },
      });
    }
  };

  const useOutsideAlerter = (ref) => {
    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdownClicked(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = React.useRef(null);
  useOutsideAlerter(wrapperRef);

  React.useEffect(() => {
    const selectDiv = document.querySelector("#wheeler");
    const scrollHorizontally = (e) => {
      e = window.event || e;
      e.preventDefault();
      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      selectDiv.scrollLeft -= delta * 30; // Multiplied by 40
    };

    const init = () => {
      if (!selectDiv) {
        return;
      }
      if (selectDiv.addEventListener) {
        selectDiv.addEventListener("mousewheel", scrollHorizontally, false);
        selectDiv.addEventListener("DOMMouseScroll", scrollHorizontally, false);
      } else {
        selectDiv.attachEvent("onmousewheel", scrollHorizontally);
      }
    };
    init();
    return () => {
      const selectDiv = document.querySelector("#wheeler");
      if (!selectDiv) {
        return;
      }
      selectDiv.removeEventListener("mousewheel", scrollHorizontally);
    };
  }, [selected]);

  React.useEffect(() => {
    !loading && setIsItemActive(generateItems(fetchLimit));
  }, [loading, fetchLimit]);

  if (loading) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        style={{ minHeight: "100vh" }}
        spacing={5}
      >
        <CircularProgress />
        <h3>Please Wait</h3>
      </Grid>
    );
  }
  if (error) {
    return <>Error: "{error.message}" occuered while trying to connect...</>;
  }

  return (
    <>
      <div className="titleWrapper">
        <h2>Dropdown with Server Side Data Rendering</h2>
      </div>
      <Box
        tabIndex={0}
        ref={wrapperRef}
        onClick={() => setDropdownClicked(true)}
        component="form"
        sx={{ paddingTop: "1rem" }}
        noValidate
        autoComplete="off"
      >
        <Box display={"flex"} alignItems={"center"}>
          <Box
            className={
              dropdownClicked ? "custom_select item_clicked" : "custom_select"
            }
            type="text"
          >
            <Stack
              id="wheeler"
              marginBottom={"-30px"}
              overflow={"auto"}
              direction="row"
              spacing={1}
            >
              {selected.map((item) => (
                <Chip
                  variant="outlined"
                  label={item.name}
                  onDelete={() => handleDelete(item.id, item.index)}
                  key={item.id}
                />
              ))}
            </Stack>
            <IconButton
              onClick={handleDropdownToggle}
              aria-label="delete"
              size="small"
            >
              <KeyboardArrowDownOutlinedIcon
                className={dropdownClicked ? "dropdown_open" : ""}
              />
            </IconButton>
          </Box>
          {selected.length > 0 ? (
            <IconButton
              className="btnClearAll"
              onClick={handleClearAll}
              size="small"
            >
              <ClearIcon />
            </IconButton>
          ) : (
            <p className="blankSpace"></p>
          )}
        </Box>
        {dropdownClicked && (
          <MenuList
            items={isItemActive}
            toggleItemActive={toggleItemActive}
            options={data.getAllUsers.node}
            onScroll={handleScroll}
            handleAdd={handleAddToChips}
          />
        )}
      </Box>
    </>
  );
};

export default GenericSelect;
