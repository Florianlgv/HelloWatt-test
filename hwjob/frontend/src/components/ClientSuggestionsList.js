import React from "react";
import { useNavigate } from "react-router-dom";

import { List, ListItemButton, ListItemText, Divider } from "@mui/material";

export default function ClientSuggestionsList({ clientSuggestions }) {
	const navigate = useNavigate();

	const handleClientClick = (clientId) => {
		navigate(`/consumption/${clientId}`);
	};
	return (
		<List aria-label="client results">
			{clientSuggestions.map((client) => (
				<React.Fragment key={client.id}>
					<ListItemButton
						onClick={() => handleClientClick(client.id)}
					>
						<ListItemText primary={client.full_name} />
					</ListItemButton>
					<Divider />
				</React.Fragment>
			))}
		</List>
	);
}
