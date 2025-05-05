/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_CLIENT, DATA_COUNT } from "../DataTable/query";
import { useLiveQuery } from "dexie-react-hooks";
import { column } from "../../config/constants";
import Grid from "@mui/material/Grid";
import { FadeMenu } from "../components";
import { GenericTable } from "../../components/GenericTable";
import { db } from "../../lib/indexedDb";
import { CircularProgress } from "../../components/CircularProgress";

const ClientDataTable = () => {
  const [refetch, setRefetch] = useState({ status: false, operation: "" });
  const [limit] = useState(1000);
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState("");

  // Sort
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");

  const handleSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleGetUserId = (data) => (
    <FadeMenu
      sx={{ color: "black", fontSize: "inherit" }}
      userId={data}
      refetchQuery={{ name: "client", handler: setRefetch }}
    />
  );

  const [getUsers, { error }] = useLazyQuery(FETCH_USER_CLIENT, {
    variables: { cursor: "", limit: limit },
    fetchPolicy: "network-only",
    onCompleted: async ({ getAllUsers: { node } }) => {
      await db.users.bulkAdd(node);
    },
  });

  const [getCount, { error: countError }] = useLazyQuery(DATA_COUNT, {
    variables: { cursor: "", limit: limit },
    fetchPolicy: "network-only",
  });

  const usersCount = useLiveQuery(async () => {
    try {
      const indexDbCount = await db.users.count();
      const res = await getCount();
      const mongoCount = res?.data?.getAllUsers?.count;

      if (indexDbCount < mongoCount) {
        const lastData = await db.users.reverse().limit(1).first();
        if (lastData) {
          await getUsers({
            variables: {
              cursor: lastData.originalId,
              limit: limit - indexDbCount,
            },
          });
          return mongoCount;
        } else {
          await getUsers();
          return 0;
        }
      } else if (indexDbCount > mongoCount) {
        const { deletefrom, deleteTill } = await db.users.toArray((data) => ({
          deletefrom: data[mongoCount - 1].originalId,
          deleteTill: data[indexDbCount - 1].originalId,
        }));
        await db.users
          .where("originalId")
          .between(deletefrom, deleteTill, true, true)
          .delete();
        return mongoCount;
      }
      return indexDbCount;
    } catch (error) {}
  }, []);

  const fetchData = async (cursor) => {
    if (cursor.startsWith("-")) {
      const newCursor = cursor.substring(1);
      return db.users
        .where("originalId")
        .below(newCursor)
        .reverse()
        .limit(5)
        .toArray((data) => data.reverse());
    } else {
      return db.users.where("originalId").above(cursor).limit(5).toArray();
    }
  };

  const users = useLiveQuery(async () => {
    try {
      const data = await fetchData(cursor);
      return data;
    } catch (error) {
      console.warn(error.message);
      if (
        error.message.includes(
          "Failed to execute 'transaction' on 'IDBDatabase'"
        )
      ) {
        /**
         * For condtion when indexedDb collection is deleted and page is visited again,
         * this is ongoing issue for some browser, this is a way around
         * */
        window.location.reload();
      }
    }
  }, [cursor]);

  const handleChangePage = async (event, newPage) => {
    if (newPage === 0) {
      setCursor("");
    } else if (page < newPage) {
      setCursor(users[users.length - 1].originalId);
    } else {
      setCursor(`-${users[0].originalId}`);
    }
    setPage(newPage);
  };

  if (!db._storeNames.includes("users")) {
    return <h2>IndexedDB collection doesn't exists please relode...</h2>;
  }

  if (error) {
    return <p>Error: {error.message}...</p>;
  }

  if (!usersCount && !users) {
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

  if (users.length === 0 || !usersCount) {
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

  return (
    <>
      <GenericTable
        tableReloadHandler={handleChangePage}
        dataLength={users.length}
        id="traineeTable"
        data={users}
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
        count={usersCount}
        page={page}
        rowsPerPage={5}
        onChangePage={handleChangePage}
      />
    </>
  );
};

export default ClientDataTable;
