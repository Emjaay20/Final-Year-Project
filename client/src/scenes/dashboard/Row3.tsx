import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import { useGetBodyTemperaturesQuery } from "@/states/api";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { GetBodyTemperaturesResponse, MonthlyBodyTemperatureData } from "@/types";

const Row3 = () => {
  const { palette } = useTheme();
  const { data } = useGetBodyTemperaturesQuery();

  console.log("Body temperature data:", data);

  const bodyTemperatureAverage = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData.map(({ month, average }) => ({
        name: month.substring(0, 3),
        average,
      }))
    );
  }, [data]);

  const bodyTemperatureMinMax = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData.map(({ month, min, max }) => ({
        name: month.substring(0, 3),
        min,
        max,
      }))
    );
  }, [data]);

  const temperatureVariability = useMemo(() => {
    return (
      data &&
      data[0]?.monthlyData.map(({ month, readings }) => {
        if (!readings.length) return { name: month.substring(0, 3), variability: 0 };
        const mean = readings.reduce((sum, r) => sum + r.value, 0) / readings.length;
        const variance = readings.reduce((sum, r) => sum + Math.pow(r.value - mean, 2), 0) / readings.length;
        return {
          name: month.substring(0, 3),
          variability: Math.sqrt(variance).toFixed(2),
        };
      })
    );
  }, [data]);

  return (
    <>
      {/* Average Body Temperature Chart */}
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Average Body Temperature"
          subtitle="Displays the average body temperature per month"
          sideText="Temperature Overview"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={bodyTemperatureAverage}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="average" stroke={palette.primary.main} dot={true} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Min/Max Body Temperature Chart */}
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Body Temperature Min/Max"
          subtitle="Shows minimum and maximum body temperatures for each month"
          sideText="Temperature Range"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={bodyTemperatureMinMax}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.secondary.main} stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.tertiary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.tertiary.main} stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Area type="monotone" dataKey="min" stroke={palette.secondary.main} fill="url(#colorMin)" />
            <Area type="monotone" dataKey="max" stroke={palette.tertiary.main} fill="url(#colorMax)" />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      {/* Temperature Variability Chart */}
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Temperature Variability (TVI)"
          subtitle="Analyzes daily fluctuations in body temperature"
          sideText="Variability Indicator"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={temperatureVariability}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Bar dataKey="variability" fill={palette.warning.main} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row3;
