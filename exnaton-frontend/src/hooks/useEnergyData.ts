import { useEffect, useState } from "react";
import axios from "axios";
import { EnergyData, EnergyStatistics, ErrorResponse } from "exnaton-frontend/utils/interface";

const useEnergyData = (selectedMuid: string, startDate: string, endDate: string, selectedInterval: string) => {
	const [energyData, setEnergyData] = useState<EnergyData[]>([]);
	const [summaryStats, setSummaryStats] = useState<EnergyStatistics | null>(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [hasMoreData, setHasMoreData] = useState(true);
	const [isBrushActive, setIsBrushActive] = useState(false);

	const isFilterValid = selectedMuid && startDate && endDate;

	useEffect(() => {
		setCurrentPage(1);
		setEnergyData([]);
		setHasMoreData(true);
	}, [selectedMuid, startDate, endDate, selectedInterval]);

	const fetchEnergyData = async () => {
		if (!isFilterValid || !hasMoreData) return;

		setLoading(true);
		setError("");
		try {
			const response = await axios.get("http://localhost:3001/energy-readings", {
				params: {
					interval: selectedInterval,
					muid: selectedMuid,
					startDate,
					endDate,
					limit: 30,
					page: currentPage,
				},
			});

			const transformedData = response.data.data.map((item: EnergyData) => ({
				timestamp: item.timestamp,
				meter_reading: item.meter_reading,
			}));

			setEnergyData((prevData) => [...prevData, ...transformedData]);
			setHasMoreData(response.data.hasMoreData);
			setCurrentPage((prevPage) => prevPage + 1);
			setError("");
			if (!response.data.hasMoreData) {
				setIsBrushActive(true);
			}
		} catch (err) {
			const errorData = (err as { response?: { data?: ErrorResponse } }).response?.data;
			setError(errorData?.message || "Error fetching data");
		} finally {
			setLoading(false);
		}
	};

	const fetchSummaryStats = async () => {
		if (!isFilterValid) return;

		try {
			const response = await axios.get("http://localhost:3001/energy-readings/stats", {
				params: { muid: selectedMuid, startDate, endDate },
			});
			setSummaryStats(response.data);
		} catch (err) {
			console.error("Failed to fetch summary stats:", err);
		}
	};

	return {
		energyData,
		summaryStats,
		error,
		loading,
		hasMoreData,
		isBrushActive,
		fetchEnergyData,
		fetchSummaryStats,
		setCurrentPage,
	};
};

export default useEnergyData;
