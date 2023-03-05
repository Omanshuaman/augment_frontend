import { useState } from "react";
import ProfileModal from "./ProfileModal";
import * as React from "react";
import Cookies from "universal-cookie";
import { Button } from "@chakra-ui/react";
import Homepage from "./HomePage";

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
import { ChatState } from "../Context/ChatProvider";
import { useHistory } from "react-router-dom";
import Tables from "./Table";
function Map() {
  const myStorage = window.localStorage;
  const { user, setUser } = ChatState();

  const cookies = new Cookies();

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
            <Tables></Tables>
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
              <Homepage setonClick={onLoginClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}
export default Map;
