import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MedicationIcon from "@mui/icons-material/Medication";
import PasswordIcon from "@mui/icons-material/Password";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonAppBar from "../../components/ButtonAppBar";
import SmsIcon from '@mui/icons-material/Sms';

const PharmacistDashboard = (props) => {
  return (
    <ButtonAppBar user="Pharmacist" actionButton="Log out" title={props.title}>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/pharmacist/profile">
            <ListItemIcon>
              <Avatar
                sx={{
                  m: 0,
                  bgcolor: "white",
                  color: "#293241",
                  width: 30,
                  height: 30,
                  padding: 0
                }}
              >
                <AccountCircleIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/pharmacist/medicines">
            <ListItemIcon>
              <Avatar
                sx={{
                  m: 0,
                  bgcolor: "white",
                  color: "black",
                  width: 30,
                  height: 30,
                  padding: 0
                }}
              >
                <MedicationIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Medicines" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/pharmacist/salesreport">
            <ListItemIcon>
              <Avatar
                sx={{
                  m: 0,
                  bgcolor: "white",
                  color: "black",
                  width: 30,
                  height: 30,
                  padding: 0,
                }}
              >
                <AttachMoneyIcon sx={{ width: 30, height: 30 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="View Sales Report" />
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* <ListItemButton component={Link} to="/auth/changepassword">
        <ListItemIcon>
          <Avatar
            sx={{
              m: 0,
              bgcolor: "white",
              color: "black",
              width: 30,
              height: 30,
              padding: 0
            }}
          >
            <PasswordIcon sx={{ width: 30, height: 30 }} />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary="Change My Password" />
      </ListItemButton>
    </ListItem>
      </List > */}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/chat">
            <ListItemIcon>
              <Avatar
                sx={{
                  m: 0,
                  bgcolor: "white",
                  color: "black",
                  width: 30,
                  height: 30,
                  padding: 0,
                }}
              >
                <SmsIcon sx={{ width: 30, height: 30 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Chat/VideoCall Patients" />
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </ButtonAppBar >
  );
};
export default PharmacistDashboard;
