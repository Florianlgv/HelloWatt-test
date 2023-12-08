import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./SearchPage";
import Header from "./Header";
import ConsumptionPage from "./ConsumptionPage";
const App = () => {
	return (
		<Router>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<SearchPage />} />
					<Route
						path="/consumption/:id"
						element={<ConsumptionPage />}
					/>
				</Routes>
			</main>
		</Router>
	);
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
