import * as React from 'react';
import { Typography, Toolbar, Box, AppBar, IconButton, Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, InboxIcon, MailIcon, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';



export default function ButtonAppBar(props) {

	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 4 }}>
				<Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
					<Typography sx={{ fontWeight: "bold", verticalAlign: "text-bottom", fontSize: '20px' }}>{props.user} Dashboard</Typography>
				</Box>
			</Box>
			<Divider />
			{props.children}
		</Box>
	);

	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});


	const toggleDrawer = (anchor, open) => (event) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	return (
		<>
			<div>
				<Drawer
					anchor={"left"}
					open={state["left"]}
					onClose={toggleDrawer("left", false)}
				>
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
						<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
							{props.title}
						</Typography>
						<Button color="inherit"> {props.actionButton} </Button>
					</Toolbar>
				</AppBar>
			</Box>
		</>

	);
}