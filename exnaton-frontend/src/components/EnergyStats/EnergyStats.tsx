import { EnergyStatistics } from "exnaton-frontend/utils/interface";
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface EnergyStatsProps {
	energyStats: EnergyStatistics | null;
}

const EnergyStats: React.FC<EnergyStatsProps> = ({ energyStats }) => {
	return (
		<Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-lg">
			<CardHeader className="text-center mb-4">
				<CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
					<span>🌞</span>
					<span>Average Daily Usage</span>
				</CardTitle>
				<p className="text-4xl font-extrabold text-indigo-900 mt-2">
					{energyStats ? `${energyStats.average.toFixed(2)} kWh` : "Select a date range"}
				</p>
				{energyStats && (
					<CardDescription className="text-sm text-gray-700 mt-4">
						This is the average energy you used daily during the selected dates.
					</CardDescription>
				)}
			</CardHeader>

			<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 font-medium">
				<Card className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
					<CardTitle className="flex items-center space-x-2 text-lg font-semibold text-blue-700">
						<span>🔽</span>
						<span>Minimum Usage</span>
					</CardTitle>
					<p className="text-3xl font-extrabold text-blue-900 mt-2">{energyStats ? `${energyStats.min.toFixed(4)} kWh` : "0.0000 kWh"}</p>
					<CardDescription className="text-sm italic text-center text-gray-600 mt-1">Lowest recorded energy in a day.</CardDescription>
				</Card>

				<Card className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
					<CardTitle className="flex items-center space-x-2 text-lg font-semibold text-indigo-700">
						<span>🌟</span>
						<span>Peak Usage</span>
					</CardTitle>
					<p className="text-3xl font-extrabold text-indigo-900 mt-2">
						{energyStats ? `${energyStats.peakReading.toFixed(4)} kWh` : "0.0000 kWh"}
					</p>
					<CardDescription className="text-sm italic text-center text-gray-600 mt-1">
						{energyStats
							? `Occurred on ${new Date(energyStats.peakTime).toLocaleDateString()} at ${new Date(
									energyStats.peakTime
							  ).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC`
							: "Date & Time"}
					</CardDescription>
				</Card>
			</CardContent>
		</Card>
	);
};

export default EnergyStats;
