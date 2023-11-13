import ButtonAppBar from "../../components/ButtonAppBar";
import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MedicationIcon from "@mui/icons-material/Medication";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptIcon from "@mui/icons-material/Receipt";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Link } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";

const PatientDashboard = (props) => {
  return (
    <ButtonAppBar
      user="Patient"
      actionButton="Log out"
      title={props.title}
      cart="true"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/patient/medicines">
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
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/patient/cart">
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
                <ShoppingCartIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/patient/orders">
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
                <FactCheckIcon sx={{ width: 25, height: 25 }} />
              </Avatar>
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
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
export default PatientDashboard;

