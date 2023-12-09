import React from "react";
import SearchBar from "./SearchBar";
import ResponsiveImage from "./ResponsiveImage";
import { Grid, Container } from "@mui/material";

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
