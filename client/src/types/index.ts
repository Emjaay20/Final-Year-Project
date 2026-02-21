export interface MonthlyHeartRateData {
  month: string;
  average: number;
  min: number;
  max: number;
  readings: Array<{ value: number }>;
}

export interface HeartRateDoc {
  id: string;
  monthlyData: MonthlyHeartRateData[];
}

export type GetHeartRatesResponse = HeartRateDoc[];

export interface MonthlyBodyTemperatureData {
  month: string;
  average: number;
  min: number;
  max: number;
  readings: Array<{ value: number }>;
}

export interface BodyTemperatureDoc {
  id: string;
  monthlyData: MonthlyBodyTemperatureData[];
}

export type GetBodyTemperaturesResponse = BodyTemperatureDoc[]; 