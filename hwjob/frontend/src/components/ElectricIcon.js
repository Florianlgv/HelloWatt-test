import React from "react";

import { Typography, Box } from "@mui/material";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FlashOffIcon from "@mui/icons-material/FlashOff";

export default function ElectricIcon({ hasElectricHeating }) {
	return (
		<Box
			display="flex"
			alignItems="center"
			justifyContent="center"
			bgcolor="#00B0F463"
			p={1}
			borderRadius={1}
		>
			{hasElectricHeating ? (
				<>
					<FlashOnIcon
						fontSize="large"
						style={{ color: "rgb(255, 251, 0)" }}
					/>
					<Typography
						component="h6"
						variant="h6"
						style={{ marginLeft: 8 }}
					>
						Electric heating
					</Typography>
				</>
			) : (
				<>
					<FlashOffIcon
						fontSize="large"
						style={{ color: "rgb(0, 0, 0)" }}
					/>
					<Typography
						component="h6"
						variant="h6"
						style={{ marginLeft: 8 }}
					>
						No electric heating
					</Typography>
				</>
			)}
		</Box>
	);
}
