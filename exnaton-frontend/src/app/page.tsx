"use client";
import React, { useState, useEffect } from "react";
import EnergyDataChart from "../components/EnergydataChart/EnergyDataChart";
import ChartSkeleton from "exnaton-frontend/components/SkeletonLoader/ChartSkeleton";
import { useAppSelector } from "exnaton-frontend/lib/hook";
import { RootState } from "exnaton-frontend/lib/store";
import FilterControls from "exnaton-frontend/components/FilterControls/FilterControls";
import useEnergyData from "exnaton-frontend/hooks/useEnergyData";
import Hypothesis from "exnaton-frontend/components/Hypothesis/Hypothesis";
import EnergyStats from "exnaton-frontend/components/EnergyStats/EnergyStats";

export default function Page() {
	const [selectedInterval, setSelectedInterval] = useState("1D");
	const [showAdvancedChart, setShowAdvancedChart] = useState(false);
	const { startDate, endDate, selectedMuid } = useAppSelector((state: RootState) => state.filters);
	const { energyData, summaryStats, error, loading, hasMoreData, isBrushActive, fetchEnergyData, fetchSummaryStats } = useEnergyData(
		selectedMuid as string,
		startDate as string,
		endDate as string,
		selectedInterval
	);

	const isFilterValid = !!(selectedMuid && startDate && endDate);

	useEffect(() => {
		if (isFilterValid) {
			fetchSummaryStats();
		}
	}, [selectedMuid, startDate, endDate, selectedInterval]);

	const handleViewAdvancedStats = () => {
		setShowAdvancedChart(true);
		fetchEnergyData();
		fetchSummaryStats();
	};

	return (
		<div className="bg-gray-100 min-h-screen py-10 px-6">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-extrabold text-gray-800 mb-2">Exnaton Energy App</h1>
				<p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore and analyze your energy consumption patterns effortlessly</p>
			</div>

			<div className="flex flex-col md:flex-row items-start justify-center gap-10 max-w-7xl mx-auto">
				<div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg space-y-6">
					<h2 className="text-2xl font-semibold text-gray-800">Choose Filters</h2>
					<FilterControls
						selectedInterval={selectedInterval}
						setSelectedInterval={setSelectedInterval}
						handleViewAdvancedStats={handleViewAdvancedStats}
						isFilterValid={isFilterValid}
					/>
				</div>

				<div className="w-full md:w-2/3 space-y-8">
					<EnergyStats energyStats={summaryStats} />

					<div className="p-6 bg-white rounded-lg shadow-lg">
						{showAdvancedChart ? (
							loading ? (
								<ChartSkeleton />
							) : (
								<EnergyDataChart
									data={energyData}
									summaryStats={summaryStats}
									fetchMoreData={fetchEnergyData}
									loading={loading}
									isBrushActive={isBrushActive}
									hasMoreData={hasMoreData}
									error={error}
								/>
							)
						) : (
							<div className="text-center text-gray-500 py-10">
								Please select your preferences and view your energy consumption graph.
							</div>
						)}
					</div>

					<div className="p-6 bg-white rounded-lg shadow-lg">
						<Hypothesis />
					</div>
				</div>
			</div>
		</div>
	);
}
