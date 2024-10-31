import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";

const Hypothesis = () => {
	return (
		<Card className="mt-4 bg-white rounded-lg shadow-md">
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-4 sm:flex-row">
				<h2 className="text-xl font-semibold text-gray-800">Hypothesis of Energy Data</h2>
			</CardHeader>
			<CardContent className="p-4 space-y-6">
				<p className="text-gray-700">
					This analysis examines energy consumption patterns for two meters, providing insights into operational status and usage behaviors.
					Each meter’s data is collected over a one-month period with measurements every 15 minutes, allowing for detailed consumption
					tracking.
				</p>

				<div className="space-y-3">
					<h3 className="text-lg font-bold text-gray-800">Meter Analysis</h3>
					<ul className="list-disc pl-6 text-gray-700 space-y-2">
						<li>
							<b>Meter ID `95ce3367-cbce-4a4d-bbe3-da082831d7bd`</b>: This meter displays consistent, small energy readings at each
							interval. This pattern indicates ongoing energy usage, suggesting a setting with continuous power demand, such as a
							residential area or an office with baseline energy consumption (e.g., for heating, ventilation, or IT equipment).
						</li>
						<li>
							<b>Meter ID `1db7649e-9342-4e04-97c7-f0ebb88ed1f8`</b>: This meter reports zero consumption for the entire period, which
							may indicate a non-operational or unoccupied space. The lack of usage could be due to an area with no active energy
							requirements, or potentially a technical fault if the expectation was for regular readings.
						</li>
					</ul>
				</div>

				<div className="space-y-3">
					<h3 className="text-lg font-bold text-gray-800">Hypothesis and Insights</h3>
					<p className="text-gray-700">
						<b>Hypothesis:</b> Based on these observations, it is likely that <b>Meter `95ce3367-cbce-4a4d-bbe3-da082831d7bd`</b> reflects
						a space with continuous low-to-moderate energy demand. This could be a facility with consistent operational hours or
						residential occupancy. On the other hand, <b>Meter `1db7649e-9342-4e04-97c7-f0ebb88ed1f8`</b> appears inactive, either due to
						lack of occupancy, disconnection, or potential technical issues.
					</p>
					<p className="text-gray-700">
						These findings may help to identify and differentiate active from inactive areas, enabling more efficient energy resource
						planning and monitoring.
					</p>
				</div>

				<div className="space-y-3">
					<p className="italic text-gray-600">
						Note: The average energy consumption calculated over the selected dates provides a snapshot of typical usage within this
						timeframe. Extending the analysis to multiple months or seasons could yield even more comprehensive insights.
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default Hypothesis;
