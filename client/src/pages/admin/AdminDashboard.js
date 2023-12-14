import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MedicationIcon from "@mui/icons-material/Medication";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import { Link } from "react-router-dom";
import ButtonAppBar from "../../components/ButtonAppBar";

const AdminDashboard = (props) => {
  return (
    <ButtonAppBar user="Admin" actionButton="Log out" title={props.title}>
      <Box sx={{ display: "inline-flex", alignItems: "center", mt: 2, ml: 2 }}>
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
          <PersonIcon sx={{ width: 30, height: 30 }} />
        </Avatar>
        <Typography
          variant="body1"
          sx={{ fontWeight: "normal", verticalAlign: "text-bottom", ml: 1 }}
        >
          {" "}
          System Users
        </Typography>
      </Box>
      <List>
        {[
          { name: "Admins", route: "/admin/admins" },
          { name: "Pharmacists", route: "/admin/pharmacists" },
          { name: "Patients", route: "/admin/patients" },
        ].map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton component={Link} to={text.route}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/medicines">
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
                <MedicationIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Medicines" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/pharmacist-requests">
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
                <HowToRegIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Pharmacist Requests" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/admin/salesreport">
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
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/auth/changepassword">
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
                <PasswordIcon sx={{ width: 30, height: 30 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Change My Password" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </ButtonAppBar>
  );
};
export default AdminDashboard;

