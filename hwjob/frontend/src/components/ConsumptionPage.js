import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ConsumptionChart from "./ConsumptionChart";
import ElectricIcon from "./ElectricIcon";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import Alert from "@mui/material/Alert";

export default function ConsumptionPage() {
	const { id } = useParams();
	const [consumptionsData, setConsumptionsData] = useState({});
	const [deviceData, setDeviceData] = useState({
		hasElectricHeating: [],
		anomaly: [],
	});
	const [isLoading, setIsLoading] = useState(true);

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
					anomaly: data.anomalies,
				});
			} catch (error) {
				console.error("Fetch error:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [id]);

	return (
		<Container maxWidth="lg" className="center">
			{isLoading ? (
				<p>Chargement...</p>
			) : (
				<Grid container spacing={5} align="center">
					<Grid item xs={12}>
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
						{deviceData.anomaly.length === 0 ? (
							<Alert
								variant="filled"
								severity="success"
								sx={{ justifyContent: "center" }}
							>
								Functionning well
							</Alert>
						) : (
							<Alert
								variant="filled"
								severity="error"
								sx={{ justifyContent: "center" }}
							>
								Anomaly detected on{" "}
								{consumptionsData.months[deviceData.anomaly]} !
							</Alert>
						)}
					</Grid>
				</Grid>
			)}
		</Container>
	);
}
