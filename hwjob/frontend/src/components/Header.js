import React from "react";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
	const styles = {
		navToolbar: {
			padding: "0 10%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		homeLink: {
			flexGrow: 0,
			width: "fit-content",
			color: "#fff",
			textDecoration: "none",
		},
		iconButton: {
			color: "#fff",
		},
	};
	return (
		<AppBar position="static">
			<Toolbar component="nav" style={styles.navToolbar}>
				<Typography
					component="a"
					href="/"
					variant="h6"
					style={styles.homeLink}
				>
					Home
				</Typography>
				<IconButton style={styles.iconButton}>
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
