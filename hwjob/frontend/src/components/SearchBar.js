import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, InputAdornment, Collapse, Alert } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ClientSuggestionsList from "./ClientSuggestionsList";

export default function SearchBar() {
	const [searchInput, setSearchInput] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [clientSuggestions, setClientSuggestions] = useState([]);
	const navigate = useNavigate();

	const checkClientExists = (searchQuery) => {
		fetch(`/dashboard/check-client/?query=${searchQuery}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				if (data.client_id) {
					return data.client_id;
				}
				return null;
			})
			.catch((error) => {
				console.error("Error while checking client existence:", error);
				return null;
			});
	};

	const handleSearch = () => {
		if (searchInput) {
			checkClientExists(searchInput).then((clientId) => {
				if (clientId) {
					navigate(`/consumption/${clientId}`);
				} else {
					setErrorMsg("Client doesn't exist");
				}
			});
		}
	};

	const handleCloseAlert = () => {
		setErrorMsg("");
	};

	const handleClientSuggestions = (event) => {
		const value = event.target.value;

		if (value && value.length > 0) {
			fetch(`/dashboard/search-client/?query=${value}`)
				.then((response) => response.json())
				.then((data) => {
					setClientSuggestions(data);
					console.log(clientSuggestions);
				})
				.catch((error) => console.error("Error:", error));
		} else {
			setClientSuggestions([]);
		}
	};
	return (
		<>
			<Collapse in={errorMsg != ""}>
				{errorMsg != "" ? (
					<Alert
						severity="error"
						onClose={() => {
							setErrorMsg("");
						}}
					>
						{errorMsg}
					</Alert>
				) : (
					<></>
				)}
			</Collapse>
			<TextField
				fullWidth
				placeholder="Search for a client by id or name"
				variant="outlined"
				value={searchInput}
				onChange={(event) => {
					setSearchInput(event.target.value);
					handleCloseAlert();
					handleClientSuggestions(event);
				}}
				onKeyUp={(event) => {
					if (event.key === "Enter") {
						handleSearch();
					}
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon sx={{ color: "#aaa" }} />
						</InputAdornment>
					),
				}}
			/>
			<ClientSuggestionsList clientSuggestions={clientSuggestions} />
		</>
	);
}
