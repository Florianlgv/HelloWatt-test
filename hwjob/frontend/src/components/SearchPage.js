import React from "react";
import SearchBar from "./SearchBar";
import ResponsiveImage from "./ResponsiveImage";
import { Grid, Container } from "@mui/material";

export default function SearchPage() {
	return (
		<Container maxWidth="sm" className="center">
			<nav>
				<Grid container spacing={5} align="center">
					<Grid item xs={12}>
						<ResponsiveImage
							src="/static/img/joole.png"
							alt="Joole logo"
						/>
					</Grid>
					<Grid item xs={12}>
						<SearchBar />
					</Grid>
				</Grid>
			</nav>
		</Container>
	);
}
