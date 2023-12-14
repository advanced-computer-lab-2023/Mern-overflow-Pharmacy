import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";
import { useUser } from "../../userContest";

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";


function SideDrawer(props) {
  const navigate = useNavigate();

  const toast = useToast();

  const { userId, setUserId, userRole, setUserRole } = useUser();

  const [search, setSearch] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();


  const logoutHandler = () => {
    axios
    .post("http://localhost:8000/auth/logout")
    .then((response) => {
      console.log(response);
      setUserId("");
      setUserRole("");
      navigate("/signin");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
    // localStorage.removeItem("userInfo");
    // navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      console.log("userRole "+userRole)
      console.log((userRole === "Patient"?`http://localhost:8000/patients/chatWithDoctors/${userId}/${search}`:`http://localhost:8000/doctors/chatWithPateints/${userId}/${search}`));
      const { data } = await axios.get((userRole === "Patient"?`http://localhost:8000/patients/chatWithDoctors/${userId}/${search}`:`http://localhost:8000/doctors/chatWithPatients/${userId}/${search}`)
        );
      console.log("DATA:   "+JSON.stringify(data));
      setLoading(false);
      props.setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (docId) => {
    console.log(docId);
    console.log(userId);
    try {
      setLoadingChat(true);

      

      const { data } = await axios.post(`http://localhost:8000/api/chat`, { docId:docId,patId:userId });

      console.log("Chats:  "+JSON.stringify(data));
      
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      props.onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        {/* <Tooltip label={`Search ${userRole === "Patient"?"Doctor":"Patient"} to chat`} hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={async()=>{
            const { data } = await axios.get((userRole === "Patient"?`http://localhost:8000/patients/getAllMyDoctors/${userId}`:`http://localhost:8000/doctors/getAllMyPatients/${userId}`));

            setSearchResult(data);
            onOpen();
            }}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              {userRole=== "Patient"?"Search Doctor":"Search Patient"}
            </Text>
          </Button>
        </Tooltip> */}
        <div>
          <Menu>

            {/* <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList> */}
          </Menu>
          {/* <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu> */}
        </div>
      </Box>

      <Drawer placement="left" onClose={props.onClose} isOpen={props.isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{userRole=== "Patient"?"Search Doctor":"Search Patient"}</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              props.searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}

                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
