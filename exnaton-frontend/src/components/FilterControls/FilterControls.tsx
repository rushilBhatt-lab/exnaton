import React from "react";
import MeterIdSelector from "exnaton-frontend/components/Dropdown/MeterIdSelector";
import DatePicker from "exnaton-frontend/components/Datepicker/DatePicker";
import TimeIntervalSelector from "exnaton-frontend/components/Dropdown/TimeIntervalSelector";
import { Button } from "exnaton-frontend/components/ui/button";

interface FilterControlsProps {
	selectedInterval: string;
	setSelectedInterval: React.Dispatch<React.SetStateAction<string>>;
	handleViewAdvancedStats: () => void;
	isFilterValid: boolean;
}

const FilterControls: React.FC<FilterControlsProps> = ({ selectedInterval, setSelectedInterval, handleViewAdvancedStats, isFilterValid }) => {
	return (
		<div className="flex flex-col gap-4">
			<div>
				<label className="block text-gray-700 text-sm font-semibold  mb-1">Select Meter ID</label>
				<MeterIdSelector />
			</div>
			<div>
				<label className="block text-gray-700 text-sm font-semibold mb-1">Select Time Interval</label>
				<TimeIntervalSelector selectedInterval={selectedInterval} setSelectedInterval={setSelectedInterval} />
			</div>
			<div>
				<DatePicker />
			</div>
			<div className="mt-4">
				<Button
					type="button"
					onClick={handleViewAdvancedStats}
					disabled={!isFilterValid}
					className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
				>
					View Energy Consumption
				</Button>
			</div>
		</div>
	);
};

export default FilterControls;
