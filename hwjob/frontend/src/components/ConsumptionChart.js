import React from "react";
import { Bar } from "react-chartjs-2";
import { useWindowSize } from "react-use";

export default function ConsumptionChart({ deviceData, consumptionsData }) {
	useWindowSize();

	const barColors = consumptionsData.kwh_consumed
		? consumptionsData.kwh_consumed.map((_, index) =>
				deviceData.anomaliesIndex.includes(index)
					? "#ea4258"
					: "#00B0F4"
		  )
		: "#00B0F4";

	const chartData = {
		labels: consumptionsData ? consumptionsData.months : [],
		datasets: [
			{
				label: "Consommation en kwh",
				data: consumptionsData ? consumptionsData.kwh_consumed : [],
				backgroundColor: barColors,
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		maintainAspectRatio: false,
		scales: {
			y: {
				beginAtZero: true,
			},
		},
		plugins: {
			title: {
				display: true,
				text: consumptionsData.year
					? consumptionsData.year.join("-")
					: "",
				padding: {
					top: 10,
					bottom: 10,
				},
				font: { size: 18 },
			},
		},
		responsive: true,
	};

	return (
		<div style={{ height: "400px", width: "100%" }}>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
}
