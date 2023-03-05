import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

import { useState, useEffect } from "react";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const classes = useStyles();
  const { user, setUser } = ChatState();
  const { details, setDetails } = ChatState();

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(user.token);
      const { data } = await axios.get(
        "https://yellowclassbackend.up.railway.app/api/todo/organize",
        config
      );

      setDetails(data);
      console.log(details);
    } catch (error) {}
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Student List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((p, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{p.todo}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default List;
