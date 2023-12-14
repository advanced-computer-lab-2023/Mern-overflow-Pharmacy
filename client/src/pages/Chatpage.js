import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { useUser } from "../userContest";
import PatientDashboard from "./patient/PatientDashboard";
import DoctorDashboard from "./doctor/DoctorDashboard";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";

const Chatpage = () => {
  const { userId, setUserId, userRole, setUserRole } = useUser();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchResult, setSearchResult] = useState([]);


  return (
    <>
  {userRole==="Patient"?<PatientDashboard title="Chat/VideoCall Doctors" />:<DoctorDashboard title="Chat/VideoCall Patients" />}

    <ChakraProvider>
    <div style={{ width: "100%" }}>

      {user && <SideDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} searchResult={searchResult} setSearchResult={setSearchResult} />}
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} isOpen={isOpen} onOpen={onOpen} onClose={onClose} searchResult={searchResult} setSearchResult={setSearchResult} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        
      </Box>
    </div>
    </ChakraProvider>
    </>

  );
};

export default Chatpage;
