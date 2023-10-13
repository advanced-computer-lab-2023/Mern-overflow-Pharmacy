import ButtonAppBar from "../../components/ButtonAppBar";
import * as React from 'react';
import { Typography, Toolbar, Box, AppBar, IconButton, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, InboxIcon, MailIcon, ListItemText, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import MedicationIcon from '@mui/icons-material/Medication';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Link } from 'react-router-dom';


const AdminDashboard = (props) => {
    return (
        <ButtonAppBar user="Admin" actionButton="Log out" title={props.title}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', mt: 2, ml: 3 }}>
                <Avatar sx={{ m: 0, bgcolor: 'white', color: 'inherit', width: 40, height: 40, }}>
                    <PersonIcon sx={{ width: 30, height: 30 }} />
                </Avatar>
                <Typography sx={{ fontWeight: "normal", verticalAlign: "text-bottom" }}> System Users</Typography>
            </Box>
            <List>
                {[ {name: 'Admins', route: '/admin/admins'} , {name: 'Pharmacists', route: '/admin/pharmacists'}, {name: 'Patients', route: '/admin/patients'}].map((text, index) => (
                    <ListItem key={text.name} disablePadding>
                        <ListItemButton component={Link} to={text.route} >
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
                    <ListItemButton component={Link} to='/admin/medicines'>
                        <ListItemIcon>
                            <Avatar sx={{ m: 0, bgcolor: 'white', color: 'black', width: 30, height: 30, padding: 0 }}>
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
                    <ListItemButton component={Link} to='/admin/pharmacist-requests'>
                        <ListItemIcon>
                            <Avatar sx={{ m: 0, bgcolor: 'white', color: 'black', width: 30, height: 30, padding: 0 }}>
                                <HowToRegIcon sx={{ width: 25, height: 25 }} />
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText primary="Pharmacist Requests" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </ButtonAppBar>
    );
}
export default AdminDashboard;