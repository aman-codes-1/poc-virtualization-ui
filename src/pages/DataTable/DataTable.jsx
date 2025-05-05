import { useQuery } from "@apollo/client";
import React, { useState, memo } from "react";
import { FadeMenu } from "../components";
import { GenericTable } from "../../components/GenericTable";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "../../components/CircularProgress";
import { column } from "../../config/constants";
import { FETCH_USER_SERVER } from "./query";

const DataTable = () => {
  const [page, setPage] = useState(0);
  const { data, loading, refetch } = useQuery(FETCH_USER_SERVER, {
    variables: { cursor: "", limit: 5 },
    fetchPolicy: "network-only",
  });

  console.log("dataa", data);

  const handleChangePage = async (event, newPage) => {
    if (page < newPage) {
      await refetch({ cursor: data?.getAllUsers?.cursor });
    } else {
      await refetch({ cursor: `-${data?.getAllUsers?.pageInfo?.endCursor}` });
    }
    setPage(newPage);
  };

  const handleGetUserId = (data) => (
    <FadeMenu
      sx={{ color: "black", fontSize: "inherit" }}
      userId={data}
      refetchQuery={{ name: "server", handler: refetch }}
    />
  );

  // Sort
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          <GenericTable
            loading={loading}
            tableReloadHandler={handleChangePage}
            dataLength={data?.getAllUsers?.node?.length}
            id="traineeTable"
            data={data?.getAllUsers?.node}
            column={column}
            actions={[
              {
                Menu: handleGetUserId,
              },
            ]}
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
            rowsPerPageOptions={[10]}
            count={data?.getCount?.count}
            page={page}
            rowsPerPage={5}
            onChangePage={handleChangePage}
          />
        </>
      )}
    </>
  );
};

export default memo(DataTable);
