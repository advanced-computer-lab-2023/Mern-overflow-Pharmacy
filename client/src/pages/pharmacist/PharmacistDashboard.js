import ButtonAppBar from "../../components/ButtonAppBar";
import * as React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import MedicationIcon from "@mui/icons-material/Medication";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

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
                {/* <ListItem disablePadding>
                    <ListItemButton component={Link} to="/auth/changepassword">
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
            <Divider /> */}
            </List>
        </ButtonAppBar>
    );
};
export default PharmacistDashboard;
