import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Brush } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "exnaton-frontend/components/ui/card";
import { EnergyData, EnergyStatistics } from "../../utils/interface";
import ChartSkeleton from "../SkeletonLoader/ChartSkeleton";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export const description = "A precise visualization of your energy data";

interface Props {
	data: EnergyData[];
	summaryStats?: EnergyStatistics | null;
	fetchMoreData: () => void;
	loading: boolean;
	isBrushActive: boolean;
	hasMoreData: boolean;
	error?: string;
}

const EnergyDataChart: React.FC<Props> = ({ data, loading, hasMoreData, fetchMoreData, error }) => {
	return (
		<Card>
			<CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
					<CardTitle>Energy Consumption Over Time</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:px-6 pb-8">
				{error ? (
					<div className="flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg mb-6">
						<FontAwesomeIcon icon={faExclamationCircle} className="h-6 w-6 mr-2 text-red-700" />
						<span>{error}</span>
					</div>
				) : (
					<>
						<div className="aspect-auto w-full" style={{ height: "320px" }}>
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={data}
									margin={{
										left: 12,
										right: 12,
										bottom: 20,
									}}
								>
									<CartesianGrid vertical={false} />
									<XAxis
										dataKey="timestamp"
										tickLine={false}
										axisLine={false}
										tickMargin={8}
										minTickGap={32}
										tickFormatter={(value) => {
											const date = new Date(value);
											return date.toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											});
										}}
									/>
									<YAxis />
									<Tooltip
										formatter={(value: number) => `${value.toFixed(5)} kWh`}
										labelFormatter={(value) => {
											const date = new Date(value);
											return date.toLocaleString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
												hour: "2-digit",
												minute: "2-digit",
												timeZone: "UTC",
												hour12: false,
											});
										}}
									/>
									<Line dataKey="meter_reading" type="monotone" strokeWidth={2} dot={false} />
									<Brush dataKey="timestamp" height={40} stroke="#8884d8" fill="#f0f0f5" startIndex={0} travellerWidth={12}>
										<div className="text-xs text-gray-600">Use slider to view more data</div>
									</Brush>
								</LineChart>
							</ResponsiveContainer>
						</div>
						<div className="text-sm text-center mt-2 text-gray-500">
							<span role="img" aria-label="hand">
								👉
							</span>
							Try Dragging the slider above to have more close look
							{hasMoreData && (
								<div className="text-center mt-4">
									<Button type="button" onClick={fetchMoreData} variant="outline">
										Load More Data
									</Button>
								</div>
							)}
						</div>
						{loading && (
							<div className="text-center mt-2">
								<ChartSkeleton />
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default EnergyDataChart;
