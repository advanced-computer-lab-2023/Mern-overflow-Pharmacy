import * as React from "react";
import {
    Typography,
    Zoom,
    Toolbar,
    Box,
    AppBar,
    IconButton,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    InboxIcon,
    MailIcon,
    ListItemText,
    Divider,
    Fab
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useUser } from "../userContest";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ButtonAppBar(props) {
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", my: 4 }}>
                <Box sx={{ display: "inline-flex", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold", verticalAlign: "text-bottom", fontSize: "20px" }}>
                        {props.user} Dashboard
                    </Typography>
                </Box>
            </Box>
            <Divider />
            {props.children}
        </Box>
    );

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false
    });

    const navigate = useNavigate();

    const { userId, setUserId } = useUser();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        axios
            .post("http://localhost:8000/auth/logout")
            .then((response) => {
                console.log(response);
                setUserId("");
                navigate("/signin");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <>
            <Zoom in={isVisible}>
                <Fab color="primary" onClick={scrollToTop} sx={{ position: "fixed", bottom: 30, right: 30 }}>
                    <ArrowUpwardIcon />
                </Fab>
            </Zoom>
            <div>
                <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                    {list("left")}
                </Drawer>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer("left", true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
                            {props.title}
                        </Typography>
                        {props.cart && (
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="logout"
                                sx={{ mr: 0 }}
                                component={Link}
                                to="/patient/cart"
                            >
                                <ShoppingCartIcon />
                            </IconButton>
                        )}
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="logout"
                            sx={{ mr: 2 }}
                            component={Link}
                            onClick={handleLogout}
                        >
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
}
