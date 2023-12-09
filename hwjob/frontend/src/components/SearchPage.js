import React from "react";

import { Grid, Container } from "@mui/material";

import SearchBar from "./SearchBar";
import ResponsiveImage from "./ResponsiveImage";

export default function SearchPage() {
	return (
		<Container maxWidth="sm" className="center">
			<Grid component="nav" container spacing={5} alignItems="center">
				<Grid item xs={12} textAlign="center">
					<ResponsiveImage
						src="/static/img/joole.png"
						alt="Joole logo"
					/>
				</Grid>
				<Grid item xs={12}>
					<SearchBar />
				</Grid>
			</Grid>
		</Container>
	);
}
