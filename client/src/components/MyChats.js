import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { useUser } from "../userContest";
import { Tooltip } from "@chakra-ui/tooltip";

const MyChats = (props) => {
  
  const {fetchAgain} = props;

  const { userId, setUserId, userRole, setUserRole } = useUser();
  const [loggedUser, setLoggedUser] = useState(userId);


  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  console.log("Logged user :"+JSON.stringify(loggedUser));
  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {

      console.log("Before loading chats");
      const { data } = await axios.get(`http://localhost:8000/api/chat/${userId}`, );
      console.log("After loading chats");
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(userId);
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
    <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="row"
        alignItems="center"
        justifyContent="space-between"
        bg="white"
        width="full"
    >
            <Tooltip label={`Search ${userRole === "Patient"?"Doctor":"Patient"} to chat`} hasArrow placement="bottom-end">
          <Button  variant="ghost" onClick={async()=>{
            const { data } = await axios.get((userRole === "Patient"?`http://localhost:8000/patients/getAllMyDoctors/${userId}`:`http://localhost:8000/doctors/getAllMyPatients/${userId}`));

            props.setSearchResult(data);
            props.onOpen();
            }}>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              {userRole=== "Patient"?"Search Doctor":"Search Patient"}
            </Text>
          </Button>
        </Tooltip>


        <Text display={{ base: "none", md: "flex" }} px={4}>
        My Chats
        </Text>

    </Box>


      {/* </Box> */}
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {getSender(loggedUser, chat.users)}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
