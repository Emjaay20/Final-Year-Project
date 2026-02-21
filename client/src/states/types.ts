// General Interfaces for Sensor Readings
export interface SensorReading {
  date: string; // ISO timestamp or Date object
  value: number; // Generic value for the reading (e.g., temperature, heart rate, oxygen saturation, etc.)
}

// Daily Reading Interface for Body Temperature
export interface BodyTemperatureReading extends SensorReading {
  value: number; // Body temperature value (e.g., 36.5°C)
}

// Monthly Reading Interface for Body Temperature
export interface MonthlyBodyTemperatureData {
  month: string; // Month name or abbreviation (e.g., "January" or "Jan")
  average: number; // Average body temperature for the month
  min: number; // Minimum body temperature for the month
  max: number; // Maximum body temperature for the month
  readings: BodyTemperatureReading[]; // Array of daily body temperature readings
}

// Main Body Temperature Data Interface
export interface BodyTemperatureData {
  _id: string; // MongoDB identifier
  metric: string; // Metric name (e.g., "Body Temperature")
  unit: string; // Unit of measurement (e.g., "°C" or "°F")
  totalAverage: number; // Overall average body temperature
  totalMin: number; // Overall minimum body temperature
  totalMax: number; // Overall maximum body temperature
  monthlyData: MonthlyBodyTemperatureData[]; // Array of monthly body temperature data
  createdAt?: string; // ISO timestamp of creation
  updatedAt?: string; // ISO timestamp of last update
}

// Oxygen Saturation Interfaces
export interface OxygenReading extends SensorReading {
  value: number; // Oxygen saturation value (e.g., 98%)
}

export interface MonthlyOxygenData {
  month: string; // Month name or abbreviation (e.g., "January" or "Jan")
  average: number; // Average oxygen saturation for the month
  min: number; // Minimum oxygen saturation for the month
  max: number; // Maximum oxygen saturation for the month
  readings: OxygenReading[]; // Array of daily readings
}

export interface OxygenSaturation {
  _id: string; // MongoDB identifier
  metric: string; // Metric name (e.g., "Oxygen Saturation")
  unit: string; // Unit of measurement (e.g., "%")
  monthlyData: MonthlyOxygenData[]; // Monthly oxygen saturation data
  createdAt?: string; // ISO timestamp for record creation
  updatedAt?: string; // ISO timestamp for last update
}

// Heart Rate Interfaces
export interface HeartRateReading extends SensorReading {
  value: number; // Heart rate in beats per minute (BPM)
}

export interface MonthlyHeartRateData {
  month: string; // Month name or abbreviation (e.g., "January" or "Jan")
  average: number; // Average heart rate for the month
  min: number; // Minimum heart rate for the month
  max: number; // Maximum heart rate for the month
  readings: HeartRateReading[]; // Array of daily heart rate readings
}

export interface HeartRateData {
  _id: string; // MongoDB identifier
  metric: string; // Metric name (e.g., "Heart Rate")
  unit: string; // Unit of measurement (e.g., "BPM")
  totalAverage: number; // Overall average heart rate
  totalMin: number; // Overall minimum heart rate
  totalMax: number; // Overall maximum heart rate
  monthlyData: MonthlyHeartRateData[]; // Array of monthly heart rate data
  createdAt?: string; // ISO timestamp for record creation
  updatedAt?: string; // ISO timestamp for last update
}

// API Response Types
export type GetBodyTemperaturesResponse = BodyTemperatureData[];
export type GetOxygenSaturationsResponse = OxygenSaturation[];
export type GetHeartRatesResponse = HeartRateData[];
