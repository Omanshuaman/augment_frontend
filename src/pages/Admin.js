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
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Posts from "./Posts";

import { orange } from "@material-ui/core/colors";
import ProfileModal from "./ProfileModal";
import Cookies from "universal-cookie";
import Pagination1 from "./Pagy";
import { Container } from "@chakra-ui/react";
// import required modules
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
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
const useStyles1 = makeStyles({
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
const Admin = () => {
  const classes = useStyles();
  const classes1 = useStyles1();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [password, setPassword] = useState(null);
  const { user, setUser } = ChatState();
  const history = useHistory();
  const toast = useToast();

  const myStorage = window.localStorage;

  const cookies = new Cookies();
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const logoutHandler = () => {
    setUser(null);
    myStorage.removeItem("userInfo");
    cookies.remove("token");
  };
  const { details, setDetails } = ChatState();

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        "https://yellowclassbackend.up.railway.app/api/todo"
      );

      setDetails(data);
      console.log(details);
    } catch (error) {}
  };

  useEffect(() => {
    fetchChats();
  }, []);
  useEffect(() => {
    console.log(password);
  });
  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `https://yellowclassbackend.up.railway.app/api/user/change-password/${user._id}`,
        { password },
        config
      );
      console.log("www");
      toast({
        title: "Successfully created account.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error creating account.",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = details.slice(indexOfFirstPost, indexOfLastPost);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("admin@gmail.com");

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    // Call the admin login API endpoint
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://yellowclassbackend.up.railway.app/api/user/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Admin Login Successful.",
        // description: 'You have successfully logged in as an admin.',
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      // Store admin user info in local storage
      const userInfo = localStorage.setItem("userInfo", JSON.stringify(data));
      setUser(userInfo);

      setLoading(false);

      history.push("/admin");
      document.location.reload();
    } catch (error) {
      toast({
        title: "Admin Login Failed.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  const google = async () => {
    setPassword("123456");
    setEmail("admin@gmail.com");
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div class="whole">
      <div class="header">
        {user ? (
          <>
            <div class="login">
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  <Avatar
                    size={"sm"}
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  />
                </MenuButton>
                <MenuList>
                  <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
            <>
              <Box
                textAlign="center"
                className={classes.headingColor}
                p={2}
                mb={2}
              >
                <Typography variant="h2">Todo</Typography>
              </Box>
              <Grid container justify="center" spacing={4}>
                <Grid item md={6} xs={12}>
                  <Box
                    textAlign="center"
                    p={2}
                    className={classes.addStuColor}
                    mb={2}
                  >
                    <Typography variant="h4">Change Password</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="stuname"
                        name="stuname"
                        variant="outlined"
                        required
                        fullWidth
                        id="stuname"
                        label="New Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
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
                      onClick={handleSubmit}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Grid>

                <Grid item md={6} xs={12}>
                  <>
                    <Box
                      textAlign="center"
                      p={2}
                      className={classes1.stuListColor}
                    >
                      <Typography variant="h4">All todo List</Typography>
                    </Box>
                    <div className="container mt-5">
                      <Posts posts={currentPosts} loading={loading} />
                      <Pagination1
                        postsPerPage={postsPerPage}
                        totalPosts={details.length}
                        paginate={paginate}
                      />
                    </div>
                  </>
                </Grid>
              </Grid>
            </>
          </>
        ) : (
          <div class="loginn">
            <span class="login-button">
              <a onClick={onLoginOpen}></a>
            </span>
          </div>
        )}
      </div>
      <>
        <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <Container maxW="xl" centerContent>
                <Box bg={"blue.100"} borderRadius="lg" width={"100%"} p={10}>
                  <VStack spacing={"5px"}>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        value={email}
                        placeholder="Enter your email..."
                        bg={"gray.50"}
                        value="admin@gmail.com"
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <InputGroup>
                        <Input
                          type={show ? "text" : "password"}
                          placeholder="Enter your password..."
                          value={password}
                          bg={"gray.50"}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <InputRightElement width={"4.5rem"}>
                          <Button
                            height={"1.75rem"}
                            size="sm"
                            onClick={handleClick}
                          >
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>
                    <Button
                      width={"100%"}
                      colorScheme="blue"
                      onClick={submitHandler}
                      style={{ marginTop: "1rem" }}
                      isLoading={loading}
                    >
                      Login
                    </Button>
                  </VStack>{" "}
                </Box>
              </Container>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default Admin;
