import React from "react";
import {
  Typography,
  Box,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import List from "./List";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
});
const Table = () => {
  const classes = useStyles();
  const [todo, setTodo] = useState(null);
  const { user } = ChatState();
  const history = useHistory();
  const [pins, setPins] = useState([]);
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      todo: todo,
      createdBy: user._id,
    };

    try {
      const res = await axios.post(
        "https://yellowclassbackend.up.railway.app/api/todo",
        newPin
      );
      setPins([...pins, res.data]);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h2">Todo</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Add todo</Typography>
          </Box>
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="todo"
                  onChange={(e) => {
                    setTodo(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add
              </Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>
    </>
  );
};

export default Table;
