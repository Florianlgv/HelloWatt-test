import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const Header = () => {
	return (
		<AppBar position="static">
			<Toolbar
				component="nav"
				style={{
					padding: "0 10%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					component="a"
					href="/"
					variant="h6"
					sx={{
						flexGrow: 0,
						width: "fit-content",
						color: "#fff",
					}}
				>
					Home
				</Typography>
				<IconButton sx={{ color: "#fff" }}>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
