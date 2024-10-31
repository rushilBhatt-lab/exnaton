export interface EnergyDataResponse {
  data: {
    meter_reading: number;
    timestamp: Date;
  }[];
  hasMoreData: boolean;
}
