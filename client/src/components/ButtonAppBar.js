import * as React from "react";
import {
	Chip,
	Typography,
	Menu, MenuItem, Zoom,
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
	Fab,
	Grid
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
import io from 'socket.io-client';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import logo from "../assets/photos/logo.png";
import CloseIcon from "@mui/icons-material/Close";
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ButtonAppBar(props) {
	const { userId, setUserId, userRole, setUserRole } = useUser();
	const [notifications, setNotifications] = useState([]);
	const [newNotifications, setNewNotifications] = useState(false);

	useEffect(() => {
		let socket = io('http://localhost:8000');

		fetchNotifications();
		socket.emit('setupNotifications', userId);
		socket.on('newNotification', (newNotification) => {
			console.log("newNotification:", newNotification);
			setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
			//fetchNotifications();
			setNewNotifications(true);
		});
		return () => {
			socket.disconnect();
		};
	}, []);

	const fetchNotifications = async () => {
		try {
			const response = await axios.get('http://localhost:8000/notifications/${userId}');
			const data = await response.data;
			setNotifications(data);
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setNewNotifications(false);
	};

	const handleClose = (link) => {
		console.log("navigating to link:", typeof link);
		if (typeof link !== 'object') {
			if (link.includes("chat")) {
				if (!window.location.href.includes("chat")) window.location.href = link;
			}
			else {
				navigate(link);
			}
		}
		setAnchorEl(null);
	};
	const list = (anchor) => (
		<Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
			<Box
				sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
				role="presentation"
				onClick={toggleDrawer(anchor, false)}
				onKeyDown={toggleDrawer(anchor, false)}
			>
				<Box sx={{ my: "30px" }}></Box>
				<Divider>
					<Chip
						sx={{ mx: "10px", color: "#333", backgroundColor: "#293241", color: "white", fontSize: "15px" }}
						label={`${props.user} Dashboard`}
					/>
				</Divider>
				<Box sx={{ my: "20px" }}></Box>
				{props.children}
			</Box>

			<Box>
				<Typography sx={{ fontFamily: "rubik", fontSize: "14px", margin: "10px", color: "#293241" }}>
					© 2023 El7a2ny Solutions
				</Typography>
			</Box>
		</Box>
	);

	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false
	});

	const navigate = useNavigate();

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
			.post("http://localhost:8001/auth/logout")
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
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						<img src={logo} alt="Logo" style={{ width: "50px", height: "auto", margin: "10px" }} />
						<IconButton
							variant="contained"
							sx={{ height: "50px", width: "50px", margin: "10px" }}
							onClick={toggleDrawer("left", false)}
						>
							<CloseIcon />
						</IconButton>
					</Box>
					<Typography sx={{ mx: "10px", fontFamily: "cursive", fontWeight: "bold", color: "#1564C0" }}>
						{" "}
						El7a2ny Pharmacy
					</Typography>
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
						<Grid sx={{ marginRight: '43em' }} >
							<a href="https://www.facebook.com/el7a2nycaree" target="_blank" rel="noopener noreferrer">
								<IconButton color="white" aria-label="Facebook">
								<Facebook />
								</IconButton>
							</a>
							<a href="https://twitter.com/el7a2nycaree" target="_blank" rel="noopener noreferrer">
								<IconButton color="white" aria-label="Twitter">
								<Twitter />
								</IconButton>
							</a>
							<a href="https://www.instagram.com/el7a2nycaree" target="_blank" rel="noopener noreferrer">
								<IconButton color="white" aria-label="Instagram">
								<Instagram />
								</IconButton>
							</a>
						</Grid>
						<div>
							<IconButton onClick={handleClick} color="inherit">
								{newNotifications ? (
									<NotificationImportantIcon style={{ color: 'red' }} />
								) : (
									<NotificationsIcon />
								)}
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{notifications.map((notification, index) => (
									<MenuItem key={index} onClick={() => handleClose(notification.link)}>
										{notification.content}
									</MenuItem>
								))}
							</Menu>
						</div>
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
						{
							userRole && (userRole === "Patient" || userRole === "Pharmacist") && (
								<IconButton
								size="large"
								edge="end"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 0 }}
								component={Link}
								to={`/${userRole.toLowerCase()}/profile`}
								>
								<AccountCircleIcon />
								</IconButton>
							)
						}
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
