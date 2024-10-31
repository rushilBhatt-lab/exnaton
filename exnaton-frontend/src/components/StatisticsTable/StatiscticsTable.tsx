"use client";

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useAppSelector } from "exnaton-frontend/lib/hook";
import { RootState } from "exnaton-frontend/lib/store";
import { EnergyStatistics } from "exnaton-frontend/utils/interface";
import { useEffect, useState } from "react";

const EnergyStatsTable = () => {
	const { startDate, endDate, selectedMuid } = useAppSelector((state: RootState) => state.filters);
	const [data, setData] = useState<EnergyStatistics | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (selectedMuid && startDate && endDate) {
			const fetchData = async () => {
				setLoading(true);
				setError(null);
				try {
					const response = await fetch(
						`http://localhost:3001/energy-readings/stats?muid=${selectedMuid}&startDate=${startDate}&endDate=${endDate}`
					);

					if (!response.ok) {
						throw new Error("Network response was not ok");
					}

					const result = await response.json();
					setData(result);
				} catch (error) {
					setError(error.message);
				} finally {
					setLoading(false);
				}
			};

			fetchData();
		}
	}, [selectedMuid, startDate, endDate]);

	return (
		<Table>
			<TableCaption>Energy summary statistics from midnight 00:00 till end date midnight 00:00.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Interval</TableHead>
					<TableHead className="text-right">Average</TableHead>
					<TableHead className="text-right">Min</TableHead>
					<TableHead className="text-right">Max</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{loading ? (
					<TableRow>
						<TableCell colSpan={4}>Loading data...</TableCell>
					</TableRow>
				) : error ? (
					<TableRow>
						<TableCell colSpan={4}>Error: {error}</TableCell>
					</TableRow>
				) : data ? (
					<TableRow>
						<TableCell className="font-medium">Overall</TableCell>
						<TableCell className="text-right">{data.average.toFixed(4)}</TableCell>
						<TableCell className="text-right">{data.min.toFixed(4)}</TableCell>
						<TableCell className="text-right">{data.max.toFixed(4)}</TableCell>
					</TableRow>
				) : (
					<TableRow>
						<TableCell colSpan={4}>No data available for the selected filters.</TableCell>
					</TableRow>
				)}
			</TableBody>
			<TableFooter></TableFooter>
		</Table>
	);
};

export default EnergyStatsTable;
