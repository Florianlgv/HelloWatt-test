import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Card, Typography, Grid, Container, Alert } from "@mui/material";

import ConsumptionChart from "./ConsumptionChart";
import ElectricIcon from "./ElectricIcon";

export default function ConsumptionPage() {
	const { id } = useParams();
	const [consumptionsData, setConsumptionsData] = useState({});
	const [deviceData, setDeviceData] = useState({
		hasElectricHeating: [],
		anomaliesIndex: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`/dashboard/conso/${id}`);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setConsumptionsData(data.consumptions);
				setDeviceData({
					hasElectricHeating: data.has_electric_heating,
					anomaliesIndex: data.anomalies_index,
				});
			} catch (error) {
				setError("Error 404 : Client doesn't exist");
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	if (error) {
		return (
			<Container maxWidth="lg">
				<Typography textAlign="center" variant="h3">
					{error}
				</Typography>
			</Container>
		);
	}

	return (
		<Container component="section" maxWidth="lg" className="center">
			{isLoading ? (
				<p>Chargement...</p>
			) : (
				<Grid container spacing={5} align="center">
					<Grid component="figure" item xs={12}>
						<Card sx={{ p: 2, minHeight: "150px" }}>
							<ConsumptionChart
								consumptionsData={consumptionsData}
								deviceData={deviceData}
							/>
						</Card>
					</Grid>
					<Grid item sm={6} xs={12}>
						<ElectricIcon
							hasElectricHeating={deviceData.hasElectricHeating}
						/>
					</Grid>
					<Grid item sm={6} xs={12}>
						{deviceData.anomaliesIndex.length === 0 ? (
							<Alert
								variant="filled"
								severity="success"
								sx={{ justifyContent: "center" }}
							>
								Working well
							</Alert>
						) : (
							<Alert
								variant="filled"
								severity="error"
								sx={{ justifyContent: "center" }}
							>
								Anomaly detected on{" "}
								{
									consumptionsData.months[
										deviceData.anomaliesIndex
									]
								}{" "}
								!
							</Alert>
						)}
					</Grid>
				</Grid>
			)}
		</Container>
	);
}
