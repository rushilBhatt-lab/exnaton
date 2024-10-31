export interface EnergyStatistics {
	average: number;
	min: number;
	max: number;
	peakReading: number;
	peakTime: string;
}

export interface EnergyData {
	timestamp: string;
	meter_reading: number;
}

export interface ErrorResponse {
	statusCode: number;
	message: string;
}
